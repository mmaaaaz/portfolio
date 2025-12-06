import { Redis } from "@upstash/redis";
import type { APIRoute } from "astro";

export const prerender = false; // This makes it a server endpoint

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get environment variables from Cloudflare runtime
    const runtime = (locals as any).runtime as {
      env: {
        UPSTASH_REDIS_REST_URL: string;
        UPSTASH_REDIS_REST_TOKEN: string;
      };
    };

    // Initialize Redis using Cloudflare environment bindings
    const redis = new Redis({
      url: runtime.env.UPSTASH_REDIS_REST_URL,
      token: runtime.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const today = new Date().toISOString().split("T")[0];
    const dailyKey = `visitors:daily:${today}`;
    const uniqueKey = `visitors:unique:${today}:${ip}`;

    const hasVisitedToday = await redis.get(uniqueKey);
    let totalViews = (await redis.get<number>("visitors:total")) || 0;
    let uniqueViews = (await redis.get<number>("visitors:unique:total")) || 0;

    if (!hasVisitedToday) {
      uniqueViews = await redis.incr("visitors:unique:total");
      await redis.setex(uniqueKey, 86400, "1");
      await redis.sadd(dailyKey, ip);
      await redis.expire(dailyKey, 86400 * 7);
    }

    totalViews = await redis.incr("visitors:total");
    const todayUnique = (await redis.scard(dailyKey)) || 0;

    return new Response(
      JSON.stringify({
        success: true,
        totalViews: Number(totalViews),
        uniqueViews: Number(uniqueViews),
        todayUnique: Number(todayUnique),
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Visit counter error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to track visit",
        totalViews: 0,
        uniqueViews: 0,
        todayUnique: 0,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
