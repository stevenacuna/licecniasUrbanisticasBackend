const usuariosSchema=require("../db/schemas/userSchema");

const signUp=async (req,res)=>{
     const {userName,email, password, roles} =req.body
     res.json('signup')
}


const signIn=async (req,res)=>{
     res.json("signin")
}


module.exports={
    signUp,
    signIn
}