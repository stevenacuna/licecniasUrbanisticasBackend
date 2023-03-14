const {userModel,usuariosSchema}=require("../db/schemas/userSchema");
const bcrypt=require("bcryptjs")

const signUp=async (req,res)=>{
     const {userName,email, password, roles} =req.body;

     const newUser=new userModel({
          userName,
          email,
          password: await userModel.encryptPassword(password),
          roles
     })

     await newUser.save()
     res.json(newUser)
}


const signIn=async (req,res)=>{
     res.json("signin")
}


module.exports={
    signUp,
    signIn
}