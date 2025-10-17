import aj from "../config/arcjet.js";

const arrjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protecct(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) return res.status(429).json({ message: "Too many requests" });
      if (decision.reason.isBot()) return res.status(403).json({ message: "Access denied for bots" });
      return res.status(403).json({ message: "Request denied" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default arrjetMiddleware;