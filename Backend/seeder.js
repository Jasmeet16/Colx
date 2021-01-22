const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {products}  = require('./data/products');
const {users}  = require('./data/user');
const {User} = require('./models/userModel');
const {Product} = require('./models/productModel');
const {connectDb} = require('./config/db');

dotenv.config();

connectDb();

const importData = async () =>{
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const sampleCreator = createdUsers[0]._id;

        const sampleProducts = products.map((p)=>{
            return{...p , user : sampleCreator };
        })
        
        await Product.insertMany(sampleProducts);

        console.log("added data");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        console.log("destroyed")
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
        
    }

}

if( process.argv[2] === '-d' ){
    destroyData();
}else{
    importData();
}