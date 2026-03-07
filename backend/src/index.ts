export interface Env {
  portfolio_visitor_stats: KVNamespace;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const today = new Date().toISOString().split("T")[0];
      const uniqueKey = `visitors:unique:${today}:${ip}`;

      // Get current stats
      const totalViewsStr = await env.portfolio_visitor_stats.get("visitors:total");
      const uniqueViewsStr = await env.portfolio_visitor_stats.get("visitors:unique:total");
      const todayUniqueSetStr = await env.portfolio_visitor_stats.get(`visitors:daily:${today}`);

      let totalViews = totalViewsStr ? parseInt(totalViewsStr) : 0;
      let uniqueViews = uniqueViewsStr ? parseInt(uniqueViewsStr) : 0;
      let todayUniqueSet: Set<string> = todayUniqueSetStr ? new Set(JSON.parse(todayUniqueSetStr)) : new Set();

      // Only increment on POST
      if (request.method === "POST") {
        // Check if this IP has visited today
        const hasVisitedToday = await env.portfolio_visitor_stats.get(uniqueKey);

        if (!hasVisitedToday) {
          // Increment unique visitors
          uniqueViews++;
          await env.portfolio_visitor_stats.put("visitors:unique:total", uniqueViews.toString());

          // Mark this IP as visited today (expires in 24 hours)
          await env.portfolio_visitor_stats.put(uniqueKey, "1", {
            expirationTtl: 86400, // 24 hours
          });

          // Add to today's unique set
          if (todayUniqueSet.size < 100000) {
            // arbitrary safe limit
            todayUniqueSet.add(ip);
            await env.portfolio_visitor_stats.put(`visitors:daily:${today}`, JSON.stringify([...todayUniqueSet]), {
              expirationTtl: 604800, // 7 days
            });
          }
        }

        // Always increment total views
        totalViews++;
        await env.portfolio_visitor_stats.put("visitors:total", totalViews.toString());
      }

      const todayUnique = todayUniqueSet.size;

      return new Response(
        JSON.stringify({
          success: true,
          totalViews,
          uniqueViews,
          todayUnique,
        }),
        {
          status: 200,
          headers: corsHeaders,
        },
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
        },
      );
    }
  },
};
