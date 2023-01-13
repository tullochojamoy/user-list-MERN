const mongoose = require('mongoose');

async function connectDB(){
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true,  
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }, (err)=>{if(err) throw new Error('Error Connecting DB')});

        console.log('DB has been started')
    } catch(error){
        console.log("Database has crashed")
        return false;
    }
};

module.exports = connectDB;