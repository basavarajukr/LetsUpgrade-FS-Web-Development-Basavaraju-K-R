const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    email:{type:String,required:true,unique:true},
    picture:{type:String,default:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="},
    private:{type:Boolean,required:true,default:false},
    bio:{type:String}
},
{
    timestamps:true
})

//model for users 

const userModel = new mongoose.model('users',userSchema);


module.exports=userModel;