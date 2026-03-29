const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB () {
    try {
        await mongoose.connect('mongodb://localhost:27017/dev_tool',{})
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', err);
        throw err; // Rethrow the error for handling in index.js
    }
}

module.exports = connectDB;