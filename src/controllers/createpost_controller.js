const postmodel = require("../models/post.model")
const captionCreation = require("../services/ai.service")
const uploadImage = require("../services/storage.service")
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
async function createpost(req,res){

    const file = req.file;
    const base64Image = Buffer.from(file.buffer).toString('base64')
    
    const upload = await uploadImage(base64Image,uuidv4())
    try{
        const caption = await captionCreation(base64Image);
        
        const post = await postmodel.create({
            image : upload.url,
            caption : caption,
            user : req.user._id
        })
        
        return res.status(200).json({
            Caption: caption,
            post
            
        })
    }catch(err){
        return res.status(500).json({
            err:err
        })
    }
}

async function mypost(req,res){
    const user = req.user._id
    try{
        const check = await postmodel.find({user:user})

        const captions = check.map((caption,index) => { 
            return `Caption ${index+1} => ${caption.caption}`});
        return res.status(200).json({
            cation:captions
        })
    }
    catch(err){
        return res.status(200).json({
            error : ` There are some thing error ${err}`
        })
    }

}
module.exports={createpost,mypost}