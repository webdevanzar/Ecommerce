"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWTSECRET = process.env.JWT_SECRET;
if (!JWTSECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}
const authenticateToken = async (req, // Use the extended type here
res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Token format is incorrect.' });
        return;
    }
    try {
        const decoded = await jsonwebtoken_1.default.verify(token, JWTSECRET);
        req.user = decoded; // No more type error!
        next();
    }
    catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
exports.authenticateToken = authenticateToken;
