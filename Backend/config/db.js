const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , 
            {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true } 
        );
        console.log( `db server running on ${conn.connection.host}` );
    }catch(error){
        console.log(`Error in conneting to mongo db ${errror.message}`)
    }
}

module.exports.connectDb = connectDb;