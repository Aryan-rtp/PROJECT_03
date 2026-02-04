const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:String
})

const model = mongoose.model("USER_DATA",schema)

module.exports = model