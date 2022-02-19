const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
    
},
{
    timestamps:true
})

//model for post 

const likeModel = new mongoose.model('likes',likeSchema);


module.exports=likeModel;