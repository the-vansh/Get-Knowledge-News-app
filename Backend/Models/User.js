const mongoose = require('mongoose');
const mongodb = require('mongodb');
const {Schema} = mongoose;
const UserSchema = new Schema({
      name:{
          type:String,
          required: true,
          unique:true
      },
      email:{
          type: String,
          required:true,
          unique:true
      },
      Password:{
          type:String,
          required:true
      },
     date:{
         type:Date,
         default:Date.now
     }
});
const User=mongoose.model('User',UserSchema);

module.exports=User