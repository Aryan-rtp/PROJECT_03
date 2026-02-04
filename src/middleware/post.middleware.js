const jwt = require("jsonwebtoken")
const mongoo = require("../models/app.model")

async function authMiddleware(req,res,next){
    const {token}=req.cookies.token

     if(!token){
        res.status(401).json({
            message:"Unathorize access"
        })
    }

    try{
        const decoder = jwt.verify(token,process.env.JWT)
        const user = await mongoo.findOne({_id:decoder.id})
        req.user = user;
        next()
    }
    catch(err){
        return res.status(500).json({
            message:"Invalid Token"
        })
    }
}

module.exports = authMiddleware