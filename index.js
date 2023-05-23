// Importing Package
const express=require('express');

const cors = require('cors');
const dotenv= require('dotenv');

// Configuring dotenv
dotenv.config();
const PORT= process.env.PORT || 8000;

// Initializing App
const app= express();

// Creating Base URL
app.get('/',(req,res)=>res.json({"Message":"Server is Running"}));

// Getting Endpoint for project
const testingRoutes= require('./routes/testingroute');
app.use('/api/testing',testingRoutes);

// express.json is a parser 
app.use(express.json())
// Enabling Cors
app.use(cors())

// routing API
app.use('/api/v1/testingjwt',testingRoutes);

// Listening to Port
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})
