const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-key';

app.use(cors());
app.use(bodyParser.json());

const users = [];
const orders = [];

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
};

const createAdminAccount = async () => {
    if (!users.some(u => u.username === 'admin')) {
        const hashedPassword = await bcrypt.hash('password', 10);
        users.push({ id: 1, username: 'admin', password: hashedPassword, role: 'admin' });
        console.log('Admin account created:', { username: 'admin', password: 'password' });
    }
};
createAdminAccount();

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword, role: 'customer' };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '15h' });
    res.json({ message: 'Login successful', token, user: { username: user.username, role: user.role } });
});

app.get('/api/orders', authMiddleware, adminMiddleware, (req, res) => {
    res.json(orders);
});

app.post('/api/orders', authMiddleware, (req, res) => {
    const { items, total } = req.body;
    const user = req.user;
    if (!items || !total) {
        return res.status(400).json({ message: 'Missing order data' });
    }
    const newOrder = { id: orders.length + 1, user: { username: user.username }, items, total, date: new Date().toISOString() };
    orders.push(newOrder);
    console.log('New order received:', newOrder);
    res.status(201).json(newOrder);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});