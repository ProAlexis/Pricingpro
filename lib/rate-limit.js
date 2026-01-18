// Simple in-memory rate limiter
// Pour production, utilisez Upstash Redis ou Vercel KV

const rateLimit = (options) => {
  const tokenCache = new Map();

  const interval = options?.interval || 60000; // 1 minute par défaut
  const limit = options?.limit || 10; // 10 requêtes par défaut

  return {
    check: async (req, res) => {
      const token =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        "unknown";
      const tokenCount = tokenCache.get(token) || [0, Date.now()];

      // Reset si intervalle dépassé
      if (Date.now() - tokenCount[1] > interval) {
        tokenCache.set(token, [0, Date.now()]);
        tokenCount[0] = 0;
      }

      tokenCount[0] += 1;

      if (tokenCount[0] > limit) {
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader("X-RateLimit-Remaining", 0);
        res.setHeader("Retry-After", Math.ceil(interval / 1000));
        throw new Error("Rate limit exceeded");
      }

      tokenCache.set(token, tokenCount);
      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", limit - tokenCount[0]);

      return tokenCount;
    },
  };
};

export default rateLimit;
