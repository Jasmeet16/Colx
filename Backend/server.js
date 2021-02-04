const express = require('express');
const dotenv = require("dotenv");
const {connectDb} = require('./config/db');
const {productRoutes} = require('./routes/productRoutes');
const {userRoutes} = require('./routes/userRoutes');


dotenv.config();

connectDb();

//console.log( typeof( connectDb ) );

const app = express();

app.use(express.json());

app.get('/' , (req,res)=>{
    res.send("api is running");
});

app.use('/api/products' , productRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));