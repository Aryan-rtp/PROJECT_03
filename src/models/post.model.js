const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        res:"user_datas"
    }

})

const model = mongoose.model("post",schema)

module.exports=model