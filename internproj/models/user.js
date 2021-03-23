const mongoose=require('mongoose');
const crypto=require("crypto");
const uuidv1=require('uuid/v1');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    encry_password:{
        type:String,
        required:true,

    },
    salt:String,
},{timestamps:true});
//vit
//all

userSchema.methods ={

    autheticate:function(plainpassword){
        //return true;
        console.log(plainpassword);
        console.log(this.securePassword(plainpassword));
       console.log(this.encry_password);
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            console.log("try");
            console.log(plainpassword);
            return (crypto.createHmac('sha256',this.salt)
            .update(plainpassword).digest('hex'));
        }
        catch(err){
            console.log("catch");
            return "";
        }
    }

};

module.exports = mongoose.model("User",userSchema);
