import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import pointRoutes from './routes/pointRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/points', pointRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to Mini Online Store FO!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});