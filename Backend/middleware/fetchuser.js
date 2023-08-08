
// middleware for getting and checking the authentication token and getting the id of that user
const jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"Plaese authentication using valid token"});
    }
    // console.log("yha tak sahi h");
    try{
        const data = jwt.verify(token,"shhhh");
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).json({error:"Plaese authentication using valid"});
    }
}

module.exports = fetchuser;