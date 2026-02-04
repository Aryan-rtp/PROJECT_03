const mongoose = require("mongoose")

function connectToDb (){
    mongoose.connect(process.env.MONGOO_DB)
    .then(console.log("Connect To MONGO_DB"))
    .catch(err =>{
        console.log(`SOme Thing is wrong ${err}`)
    })
}

module.exports=connectToDb