const express = require("express")
const authMiddleware = require("../middleware/post.middleware")
const postmodel = require("../models/post.model")
const {createpost,mypost} = require("../controllers/createpost_controller")
const multer = require("multer")
const route = express.Router()
const upload = multer({storage:multer.memoryStorage()})

route.post("/",authMiddleware,upload.single("image"),createpost)

route.get("/mypost",authMiddleware,mypost)




module.exports = route