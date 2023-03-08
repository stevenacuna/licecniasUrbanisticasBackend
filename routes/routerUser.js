//cargar dependencia
let dbUsers=require("../db/entities/dbUser");
const express = require("express");
const router= express.Router();


router.get("/",(req,res)=>{
    res.send("hello word");
})

router.get("/all",async(req,res)=>{
    let result=await dbUsers.getAllUser();
     res.json(result);
})




module.exports=router;
