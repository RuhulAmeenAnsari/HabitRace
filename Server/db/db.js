const mongoose = require('mongoose')

const connectToDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to the database successfully');
    }
    catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectToDB;