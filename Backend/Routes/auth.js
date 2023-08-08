const express = require('express');
const dbconnect = require('../Models/db');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');
// connect to databse
dbconnect();
router.post('/createuser',
[
    // validations
    body('name',"Enter a valid name").isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('Password','Enter a valid password').isLength({min:8})
],
async (req,res)=>{
    let success = false;
    const errors = validationResult(req); 
    //if error in the in format of the name and the password
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array()});
    }
   // creating user
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "sorry a user with name already exit"});
        }
        const salt = await bcrypt.genSalt(10);
        const securespassword = await bcrypt.hash(req.body.Password,salt);

        user  = await User.create({
        name:req.body.name,
        Password:securespassword,
        email:req.body.email
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,'shhhh');
        success=true;
        res.json({success,authtoken});
   }catch(err){
       console.log(err.message);
       res.status(500).send("Internal server error")
   }
})


// Authentication of user /api/auth/login or for login
// route 2
router.post('/login',
[
    body('email','Enter a valid email').isEmail(),
    body('Password','Password cannot be blank').exists()
],
async (req,res)=>{
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const {email,Password} = await req.body;

    try{
       let user = await User.findOne({email});

       if(!user){
           return res.status(400).json({error : "No Username found"});
       }

       const passwordcompare = await bcrypt.compare(Password,user.Password);

       if(!passwordcompare){
           success=false
           return res.status(400).json({errror:"Please Enter a valid password"});
       }

       const data={
            user:{
                id:user.id
            }
       }

       const authtoken = jwt.sign(data,'shhhh');
       success=true
       res.json({success,authtoken});
    
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error")
    }
}) 


// route 3 get login user detail using middleware and authentication of the 


router.post('/getuser',fetchuser,async (req,res)=>{
    try{
       userId = req.user.id;
       const user = await User.findById(userId).select("-Password");
        res.send(user);
     }catch(err){
         console.log(err.message);
         res.status(500).send("Internal server error")
     }
})
module.exports = router;