const express = require("express")
const authMiddleware = require("../middleware/post.middleware")
const postmodel = require("../models/post.model")
const createpost = require("../controllers/createpost_controller")
const multer = require("multer")
const route = express.Router()
const upload = multer({storage:multer.memoryStorage()})

route.post("/",authMiddleware,upload.single("image"),createpost)



module.exports = route