const express = require('express')
const cors = require('cors')

require('dotenv').config();
const app = express();

const PORT = 4000;
app.use(cors()); // Enable CORS

app.post('/data',(req,res) => {
    // const {name} = req.body;
    // console.log(name);
    
    console.log('testing data ..........');
    
    res.status(200).json({message:'success'});
    // if(name){
    // }
}) 

app.listen(PORT,() => {
    console.log(`server is running in : ${PORT}`);
}) 