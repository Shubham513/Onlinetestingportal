const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

schema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

schema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRETEKEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(e){
        console.log(e);
    }
}
const Parent = mongoose.model('PARENT',schema);

module.exports = Parent;