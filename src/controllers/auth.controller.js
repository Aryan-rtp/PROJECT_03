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
         user
     })
}
async function login_controller(req,res){
const {username,password}=req.body

    const isexit = await mongoo.findOne({username})
    console.log(isexit)
    if(!isexit){
        return res.status(401).json({
            message:"Not Exist"
        })
    }

    const iscorrect = password == isexit.password
    console.log(iscorrect)

     if(!iscorrect){
        return res.status(401).json({
            message:"Not Exist"
        })
    }

    const token = jwt.sign({id:isexit._id},process.env.JWT)
    res.cookie("token",token)
    res.status(200).json({
        message:"login sucessfull"
    }) 
}

module.exports={login_controller,register_controller}