/**
 * Created by hwh on 16/10/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new  Schema({
    uid:{type:Number,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    signature:{type:String},
    created_at:{type:Date,detault:Date.now()},
    updated_at:{type:Date,default:Date.now()}
})

UserSchema.index({name:1})

module.exports = mongoose.model('User',UserSchema)
