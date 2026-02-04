const express = require("express")
const router = require("./routes/app.routes")
const cookies = require("cookie-parser")
const app = express()

app.use(cookies())
app.use(express.json())

app.use("/Auth",router)

module.exports=app