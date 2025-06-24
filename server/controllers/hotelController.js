import Hotel from '../models/Hotel.js';
import User from '../models/user.js';


import { verifyToken } from '@clerk/express';

export const registerHotel = async (req, res) => {
    console.log('selam');
    
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No auth header' });
    }
    const token = authHeader.split(' ')[1];
    const user = await verifyToken(token);
    console.log('Verified user:', user);

    // Buradan sonra user.id kullanarak işlemlere devam et
    // Örnek:
    const owner = user.sub;

    // Devamı eski kodun gibi
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}
