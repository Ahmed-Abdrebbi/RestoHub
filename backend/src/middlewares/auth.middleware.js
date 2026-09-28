const { verifyAccessToken } = require("../utils/tokens");

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Token manquant" });
  try {
    const payload = verifyAccessToken(header.split(" ")[1]);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) return res.status(403).json({ error: "Accès refusé" });
    next();
  };
}

module.exports = { authenticate, requireRole };