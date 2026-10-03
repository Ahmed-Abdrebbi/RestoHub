const jwt = require("jsonwebtoken")
const crypto = require("crypto")

function signAccessToken(user) {
    return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" })
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}

function hashRefreshToken(raw) {
    return crypto.createHash("sha256").update(raw).digest("hex")
}

function generateRefreshToken() {
    const raw = crypto.randomBytes(40).toString("hex")
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    return { raw, hash: hashRefreshToken(raw), expiresAt }
}

module.exports = { signAccessToken, verifyAccessToken, hashRefreshToken, generateRefreshToken }