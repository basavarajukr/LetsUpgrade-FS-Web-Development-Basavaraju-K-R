const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message:{type:String,required:true},
    user_sender:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    user_receiver:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
},
{
    timestamps:true
})

//model for post 

const chatModel = new mongoose.model('chats',chatSchema);


module.exports=chatModel;