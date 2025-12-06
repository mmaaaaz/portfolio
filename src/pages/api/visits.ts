import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const POST: APIRoute = async ({ request, locals }) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    // Initialize Redis with Cloudflare environment variables
    // @ts-ignore - locals.runtime is injected by Cloudflare adapter
    const env = locals.runtime?.env || {};
    const redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Get visitor IP
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';

    // Get current date for daily unique tracking
    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `visitors:daily:${today}`;
    const uniqueKey = `visitors:unique:${today}:${ip}`;
    
    // Check if this IP has visited today
    const hasVisitedToday = await redis.get(uniqueKey);
    
    let totalViews = await redis.get<number>('visitors:total') || 0;
    let uniqueViews = await redis.get<number>('visitors:unique:total') || 0;
    
    // If new visitor for today, increment counters
    if (!hasVisitedToday) {
      // Increment total unique visitors
      uniqueViews = await redis.incr('visitors:unique:total');
      
      // Mark this IP as visited today (expires in 24 hours)
      await redis.setex(uniqueKey, 86400, '1');
      
      // Add to daily set
      await redis.sadd(dailyKey, ip);
      await redis.expire(dailyKey, 86400 * 7); // Keep for 7 days
    }
    
    // Always increment total views
    totalViews = await redis.incr('visitors:total');
    
    // Get today's unique visitors
    const todayUnique = await redis.scard(dailyKey) || 0;

    return new Response(
      JSON.stringify({
        success: true,
        totalViews: Number(totalViews),
        uniqueViews: Number(uniqueViews),
        todayUnique: Number(todayUnique),
      }),
      { 
        status: 200, 
        headers 
      }
    );
  } catch (error) {
    console.error('Visit counter error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to track visit',
        totalViews: 0,
        uniqueViews: 0,
        todayUnique: 0,
      }),
      { 
        status: 500, 
        headers 
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
