const express = require("express")
const auth  = require("../middleware/app.middleware")
const {register_controller,login_controller}=require("../controllers/auth.controller")
const router = express.Router()



router.post("/register",register_controller)

router.post("/login",login_controller)

router.get("/user",auth,(req,res)=>{
    const user = res.user

    res.status(200).json({
        message:`Welcome back ${user.username}`
    })
})

module.exports=router