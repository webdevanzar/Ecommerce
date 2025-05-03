import bcrypt from 'bcryptjs';
import { pool1 } from '../config/db';  

export const registerUser = async (name :string,email:string,password:string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool1.query(
            'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );
        return result.rows[0].id;
    } catch (error) {
        throw new URIError(`Error registering user with email ${email}: ${error}`);
    }
};

export const findUserByEmail = async (email : string) => {
    const result = await pool1.query('SELECT * FROM users WHERE email = $1 AND isdeleted = false', [email]);
    return result.rows.length > 0 ? result.rows[0] : undefined;
};


export const loginUser = async (email: string, password: string) => {
    try {
        // Query to check if the user exists by email
        const result = await pool1.query('SELECT * FROM public.users WHERE email = $1', [email]);

        // If no user found, throw an error
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }

        const user = result.rows[0];

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is invalid, throw an error
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Return user data excluding the password
        return { id: user.id, email: user.email };
    } catch (error) {
        throw new Error(`Error logging in user with email ${email}: ${error}`);
    }
};


export const getUserById = async (userId : number)=> {
    const result = await pool1.query('SELECT id, name, email FROM users WHERE id = $1 AND isdeleted = false', [userId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

