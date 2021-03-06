const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');



var userSchema=new Schema({
    firstname:{
        type:String,
        default:''
    },
   lastname:{
       type:String,
       default:''
   },
    admin:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(passportLocalMongoose);

var user=mongoose.model('user',userSchema);

module.exports=user;