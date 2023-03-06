const express = require("express");
const router= express.Router();
const dbUsers=require("../getData");


router.get("/get/:idUser", function(req,res){
    res.json(dbUsers.getUser(req.params.idUser));
    res.status(200);
});

router.post("/create", function(req,res){
    req.body;
    res.send(dbUsers.createUser(req.body));
});

router.delete("/delete/:idUser", function(req,res){
    dbUsers.deleteUser(req.params.idUser);
    res.send("el usuario se elimino correctamente ");
    

    res.status(200);

});


module.exports=router;
