import express from 'express';
import { requireAuth } from '@clerk/express';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();

// Test amaçlı ara middleware ekledim
hotelRouter.post('/', (req, res, next) => {
  console.log('--- /api/hotels POST isteği geldi ---');
  console.log('Headers:', req.headers);
  console.log('Authorization header:', req.headers.authorization);
  console.log('req.user (auth middleware sonrası):', req.user); // Bu satır aslında requireAuth sonrası çalışmaz, next() sonrası görürüz
  next();
}, requireAuth(), registerHotel);

export default hotelRouter;
