const mongoo = require("../models/app.model")
const auth  = require("../middleware/app.middleware")
const jwt = require("jsonwebtoken")

async function register_controller(req,res){
  const {username , password}= req.body
 
     const isuserexit = await mongoo.findOne({username})
     if(isuserexit){
         return res.status(409).json({
             mes:"Username already exist"
         })
     }
 
     const user = await mongoo.create({
         username:username,
         password:password
     })
         
     const token = jwt.sign({id:user._id},process.env.JWT,{expiresIn:"2m"})
     res.cookie("token",token)
 
 
     res.status(200).json({
         message:"Account create successfully",
         
     })
}
async function login_controller(req,res){
const {username,password}=req.body

    const isexit = await mongoo.findOne({username})
    if(!isexit){
        return res.status(401).json({
            message:"Not Exist"
        })
    }

    const iscorrect = password == isexit.password
    

     if(!iscorrect){
        return res.status(401).json({
            message:"Not Exist"
        })
    }

    const token = jwt.sign({id:isexit._id},process.env.JWT)
    res.cookie("token",token)
    res.status(200).json({
        message:"login sucessfull",
        token: token
    }) 
}

module.exports={login_controller,register_controller}