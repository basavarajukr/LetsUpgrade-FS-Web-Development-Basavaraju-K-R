const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{type:String,required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"posts"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
    
},
{
    timestamps:true
})

//model for post 

const commentModel = new mongoose.model('comments',commentSchema);


module.exports=commentModel;