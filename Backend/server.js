const express = require('express');
const dotenv = require("dotenv");
const {connectDb} = require('./config/db');
const {productRoutes} = require('./routes/productRoutes');

dotenv.config();

connectDb();

console.log( typeof( connectDb ) );

const app = express();

app.get('/' , (req,res)=>{
    res.send("api is running");
});

app.use('/api/products' , productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));