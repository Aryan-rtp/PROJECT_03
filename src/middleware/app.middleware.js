const jwt = require("jsonwebtoken")
const mongoo = require("../models/app.model")

module.exports= async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(401).json({
            message:"Unathorize access"
        })
    }
    try{
        const decoder = jwt.verify(token,process.env.JWT)
        const user = await mongoo.findById(decoder.id)
        if(!user){
            return res.status(500).json({
                message:"User not find"
            })
        }
        res.user = user
        next()

    }catch(err){
        return res.status(500).json({
            message:`Something is wrong ${err}`
        })

    }

}