const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config();

const mongoURI = process.env.MONGO_ATLAS_URI ;


const connectToMongo = () => {
    mongoose.connect(mongoURI, { autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connection established URI")
    })
}



module.exports = connectToMongo;
