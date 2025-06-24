import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './controllers/clerkWebHooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';


connectDB()
connectCloudinary();

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); // Enable cross-origin resource sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())
  

//API to listen to clerk webhooks
app.use("/api/clerk",clerkWebHooks);

app.get('/',(req,res)=>res.send('API is working'))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

export default app