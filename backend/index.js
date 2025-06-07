const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connectDB = require('./db');
const User = require('./models/user');
require('dotenv').config();
const app = express();

connectDB().catch(err => console.log(err)); // Call connectDB function

const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.put('/data', (req, res) => {
    // console.log('Request Body:', req.body);
    // console.log('Request Headers:', req.headers);
    console.log('Request query:', req.query);
    // const head =  req.headers;
    const query = req.query;
    console.log(query);
    res.status(200).json({ message: 'success', query });
});

app.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: 'All field required!' })
        }

        const userExits = await User.findOne({ email });

        if (userExits) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            console.log('Email and password are required');
            res.status(400).json({ message: 'Email and password are required.' })
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid email');
            return res.status(409).json({ error: 'Invalid email or password.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid pass');
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        res.status(200).json({ message: 'Login successful.', user: userData });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`server is running in : http://localhost:${PORT}`);
}) 