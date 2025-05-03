"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool1 = void 0;
const pg_1 = require("pg"); // PostgreSQL Pool
const dotenv_1 = require("dotenv"); // dotenv
(0, dotenv_1.config)(); // dotenv configuration
// Ensure all required environment variables are loaded
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
        process.exit(1); // Exit the process if a required env variable is missing
    }
}
// Create PostgreSQL pool with environment variables
exports.pool1 = new pg_1.Pool({
    user: process.env.DB_USER, // User name from environment variable
    host: process.env.DB_HOST, // Host from environment variable
    database: process.env.DB_DATABASE, // Database name from environment variable
    password: process.env.DB_PASS, // Password from environment variable
    port: Number(process.env.DB_PORT), // Port from environment variable
});
exports.pool1.on('connect', () => {
    console.log('Database pool created and connected successfully.');
});
exports.pool1.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(1); // Exit the process if the connection to the database fails
});
