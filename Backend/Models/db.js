const mongoose = require('mongoose');

const dbconnect=()=>{
    mongoose.connect("mongodb://localhost:27017/e-com");
    console.log("connect successfully");
} 

module.exports=dbconnect;