"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.findUserByEmail = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const registerUser = async (name, email, password) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const result = await db_1.pool1.query('INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hashedPassword]);
        return result.rows[0].id;
    }
    catch (error) {
        throw new URIError(`Error registering user with email ${email}: ${error}`);
    }
};
exports.registerUser = registerUser;
const findUserByEmail = async (email) => {
    const result = await db_1.pool1.query('SELECT * FROM users WHERE email = $1 AND isdeleted = false', [email]);
    return result.rows.length > 0 ? result.rows[0] : undefined;
};
exports.findUserByEmail = findUserByEmail;
const loginUser = async (email, password) => {
    try {
        // Query to check if the user exists by email
        const result = await db_1.pool1.query('SELECT * FROM public.users WHERE email = $1', [email]);
        // If no user found, throw an error
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        const user = result.rows[0];
        // Validate the password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        // If password is invalid, throw an error
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        // Return user data excluding the password
        return { id: user.id, email: user.email };
    }
    catch (error) {
        throw new Error(`Error logging in user with email ${email}: ${error}`);
    }
};
exports.loginUser = loginUser;
const getUserById = async (userId) => {
    const result = await db_1.pool1.query('SELECT id, name, email FROM users WHERE id = $1 AND isdeleted = false', [userId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
exports.getUserById = getUserById;
