const bcrypt = require("bcrypt")
const prisma = require("../lib/prisma")
const { signAccessToken, generateRefreshToken, hashRefreshToken } = require("../utils/tokens");

async function issueToken(user) {
    const accessToken = signAccessToken(user)
    const { raw, hash, expiresAt } = generatRefreshToken()
    await prisma.refreshToken.create({ data:{ userId: user.id, tokenHash: hash, expiresAt } })
    return { accessToken, refreshToken: raw }
}

async function register(req, res) {
    const { name, email, password } = req.body
    if (name || !email || !password) return res.status(400).json({ error: "name, email, password requis"})
    
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(409).json({ error: "Email deja utilise"})   
        
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({ data: { name, email, passwordHash } }) 
    return res.status(201).json({id: user.id, name: user.name, email: user.email, role: user.role })   
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const tokens = await issueTokens(user);
  return res.json({ user: { id: user.id, name: user.name, role: user.role }, ...tokens });
}

async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "refreshToken requis" });

  const hash = hashRefreshToken(refreshToken);
  const stored = await prisma.refreshToken.findFirst({ where: { tokenHash: hash } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    return res.status(401).json({ error: "Refresh token invalide ou expiré" });
  }

  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  return res.json(await issueTokens(user));
}

async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "refreshToken requis" });
  const hash = hashRefreshToken(refreshToken);
  await prisma.refreshToken.updateMany({ where: { tokenHash: hash, revokedAt: null }, data: { revokedAt: new Date() } });
  return res.status(204).send();
}

module.exports = { register, login, refresh, logout };