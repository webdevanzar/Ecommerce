import { Request, Response, NextFunction } from 'express';
import { registerUser, findUserByEmail, loginUser, getUserById } from '../models/userModel';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { log } from 'console';

dotenv.config();
const JWTSECRET = process.env.JWT_SECRET;

const getLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Login page' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

const getRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Register page' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password , cpassword} = req.body;

    try {
        if (!name || !email || !password || !cpassword) {
             res.status(400).json({ message: 'All fields are required' });
             return;
        }


        if (password.length < 8) {
             res.status(400).json({ message: 'At least enter 8 characters' });
             return;
        }

        if(password !== cpassword){
             res.status(400).json({ message: 'Password do not matched..' });
             return;
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
             res.status(409).json({ message: 'User already exists with this email' });
             return;    
        }

        const userId = await registerUser(name, email, password);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};



export const login = async (req: Request, res: Response): Promise<void> => {
    console.log("Received body:", req.body); // 👈 Add this    
    const { email, password } = req.body;
   
    

    try {
        // Ensure email and password are provided
        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Call the loginUser function to authenticate the user
        const user = await loginUser(email, password);

        // Ensure JWT_SECRET is a valid string
        const secret = process.env.JWT_SECRET;
        if (!secret) {
             res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not defined' });
             return;
            }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            secret as string, // Type assertion to treat the secret as a string
            { expiresIn: '1h' }
        );

        // Send response with the generated token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        const user = await getUserById(userId);

        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export { getRegister,register, getLogin, getUserProfile };
