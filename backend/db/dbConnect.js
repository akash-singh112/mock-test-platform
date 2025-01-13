const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path: '../.env'});

const DBConnection = async function () {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        if(!MONGO_URI){
            throw new Error('MONGO_URI environment variable is not loaded!');
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connection to database is successful');
    } catch (error) {
        console.error(`Error occured while connecting with database: ${error.message}`);
    }
}

module.exports = {DBConnection};