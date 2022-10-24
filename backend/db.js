//Importing mongoDB and Database link through URL
const mongoose = require('mongoose');
const mongoURI= "mongodb://localhost:27017/inotebook?directConnection=true"

const connectToMongo = ()=>
{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Succesfully");
    })
}

module.exports = connectToMongo;