const postmodel = require("../models/post.model")
const captionCreation = require("../services/ai.service")
const fs = require("fs");
async function createpost(req,res){
    const file = req.file;
    const base64Image = Buffer.from(file.buffer).toString('base64')
    

    try{

        const caption = await captionCreation(base64Image);
        console.log(caption)
        return res.status(200).json({
            Caption: caption
        })
    }catch(err){
        return res.status(500).json({
            err:err
        })
    }
}

module.exports=createpost