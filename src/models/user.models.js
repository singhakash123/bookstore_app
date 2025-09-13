import mongoose  , {Schema} from "mongoose";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken" ; 

const userSchema = new Schema(
  {
       username : {
               type : String , 
               required : true , 
               trim : true, 
               minlength :[8 , "minimum 8 character should be"] , 
               unique : true , 
               lowercase : true , 
       } , 
       email : {
               type : String , 
               required : true , 
               unique : true , 
               trim : true , 
               lowercase : true , 

       } ,
       passwoord : {
               type : String , 
               required : true , 
               minlength : [8 , "minimum 8 char is required"] , 
               select : false 
       } , 
       refreshToken : {
              type : String  ,
       }, 
       avatar : {
              type : String , 
       }, 
       coverImage : {

       }
 }, 
  {
    timestamps : true
  })

  //  hash the password before saving into the database : 
userSchema.pre('save' , async function (next){
    if(!this.isModefied('password'))  return next()

    this.passwoord = await bcrypt.hash(this.passwoord , 10)
    next()
})



// compare the password  : 




export const User= mongoose.model("User" , userSchema)