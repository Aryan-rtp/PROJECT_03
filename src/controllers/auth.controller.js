const mongoo = require("../models/app.model")
const jwt = require("jsonwebtoken")

const cookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
};

async function register_controller(req,res){

   const {username , password}= req.body;

   const isuserexit = await mongoo.findOne({username});

   if(isuserexit){
      return res.status(409).json({
         message:"Username already exist"
      });
   }

   const user = await mongoo.create({
      username,
      password
   });

   const token = jwt.sign(
      {id:user._id},
      process.env.JWT,
      {expiresIn:"1d"}
   );

   res.cookie("token", token, cookieOptions);

   res.status(200).json({
      message:"Account create successfully"
   });
}



async function login_controller(req,res){

   const {username,password}=req.body;

   const isexit = await mongoo.findOne({username});

   if(!isexit){
      return res.status(401).json({
         message:"Invalid credentials"
      });
   }

   if(password !== isexit.password){
      return res.status(401).json({
         message:"Invalid credentials"
      });
   }

   const token = jwt.sign(
      {id:isexit._id},
      process.env.JWT,
      {expiresIn:"1d"}
   );

   res.cookie("token", token, cookieOptions);

   res.status(200).json({
      message:"login successful",
      token:token
   });
}

module.exports = {login_controller,register_controller};
