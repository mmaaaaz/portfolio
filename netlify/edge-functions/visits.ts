import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv()

export default async (req: Request, context: any) => {
  // Set CORS headers for Cloudflare proxy
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers 
    });
  }

  try {
    // Get visitor IP (works with Cloudflare proxy)
    const ip = 
      req.headers.get('cf-connecting-ip') || 
      req.headers.get('x-forwarded-for')?.split(',')[0] || 
      req.headers.get('x-real-ip') || 
      'unknown';

    // Get current date for daily unique tracking
    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `visitors:daily:${today}`;
    const uniqueKey = `visitors:unique:${today}:${ip}`;
    
    // Check if this IP has visited today
    const hasVisitedToday = await redis.get(uniqueKey);
    
    let totalViews = await redis.get('visitors:total') || 0;
    let uniqueViews = await redis.get('visitors:unique:total') || 0;
    
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

export const config = {
  path: '/api/visits',
};
