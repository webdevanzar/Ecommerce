"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getLogin = exports.register = exports.getRegister = exports.login = void 0;
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWTSECRET = process.env.JWT_SECRET;
const getLogin = async (req, res) => {
    try {
        res.status(200).json({ message: 'Login page' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getLogin = getLogin;
const getRegister = async (req, res) => {
    try {
        res.status(200).json({ message: 'Register page' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getRegister = getRegister;
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'At least enter 8 characters' });
        }
        const existingUser = await (0, userModel_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(409).json({ message: 'User already exists with this email' });
        }
        const userId = await (0, userModel_1.registerUser)(name, email, password);
        res.status(201).json({ message: 'User registered successfully', userId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    console.log("Received body:", req.body); // 👈 Add this    
    const { email, password } = req.body;
    try {
        // Ensure email and password are provided
        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Call the loginUser function to authenticate the user
        const user = await (0, userModel_1.loginUser)(email, password);
        // Ensure JWT_SECRET is a valid string
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not defined' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, // Type assertion to treat the secret as a string
        { expiresIn: '1h' });
        // Send response with the generated token
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await (0, userModel_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserProfile = getUserProfile;
