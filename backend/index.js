const express = require('express')
const cors = require('cors')

require('dotenv').config();
const app = express();

const PORT = 4000;
app.use(cors()); 
app.use(express.json());

// app.post('/data', (req, res) => {
//     // console.log('Request Body:', req.body);
//     // console.log('Request Headers:', req.headers);
//     console.log('Request query:', req.query);
//     // const head =  req.headers;
//     const query = req.query;
//     res.status(200).json({ message: 'success', que });
// });

app.put('/data', (req, res) => {
    // console.log('Request Body:', req.body);
    // console.log('Request Headers:', req.headers);
    console.log('Request query:', req.query);
    // const head =  req.headers;
    const query = req.query;
    console.log(query);
    res.status(200).json({ message: 'success', query });
});

app.listen(PORT,() => {
    console.log(`server is running in : http://localhost:${PORT}`);
}) 