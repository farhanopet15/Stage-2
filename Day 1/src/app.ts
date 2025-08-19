import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoute';
import orderRoutes from './routes/orderRoute';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});