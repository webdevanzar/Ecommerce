import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes';  // Correctly importing the user routes
import adminRoutes from './routes/adminRoutes'

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// User routes
app.use('/api/users', userRoutes);

//Admin routes
app.use('/admin', adminRoutes);


const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server started on ${Port}`));
