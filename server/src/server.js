import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from '#config/db.js';

dotenv.config();

// Connect DB + Start Server
connectDB().catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});