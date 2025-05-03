import { Pool } from 'pg';  // PostgreSQL Pool
import { config } from 'dotenv';  // dotenv
config();  // dotenv configuration

const requiredEnvVariables = [
  'DB_USER', 
  'DB_HOST', 
  'DB_DATABASE', 
  'DB_PASS', 
  'DB_PORT'
];

for (const varName of requiredEnvVariables) {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is missing`);
    process.exit(1);  
  }
}

export const pool1 = new Pool({
  user: process.env.DB_USER,  // User name from environment variable
  host: process.env.DB_HOST,  // Host from environment variable
  database: process.env.DB_DATABASE,  // Database name from environment variable
  password: process.env.DB_PASS,  // Password from environment variable
  port: Number(process.env.DB_PORT),  // Port from environment variable
});

pool1.on('connect', () => {
  console.log('Database pool created and connected successfully.');
});

pool1.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(1);  
});
