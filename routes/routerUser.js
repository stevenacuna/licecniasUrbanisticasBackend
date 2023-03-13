//cargar dependencia
let userSchema = require("../db/schemas/userSchema");
const express = require("express");
const router = express.Router();

router.get("/get/:idUser", async (req, res) => {
    try {
        let idUser = req.params.idUser;
        let result = await userSchema.findById(idUser);
        res.json(result);
    } catch (ex) {
        console.log(ex);
        return {};
    }
});

router.get("/all", async (req, res) => {
    try {
        let result = await userSchema.getAllUser();
        res.json(result);
    } catch (ex) {
        console.log(ex);
        return [];
    }
});

router.post("/create", async (req, res) => {
    try {
        let newUser = req.body;
        let result = await userSchema.createUser(newUser);
        res.json(result);
    } catch (ex) {
        console.log(ex);
        return {};
    }
});

router.delete("/delete/:idUser", async (req, res) => {
    try {
        let idUser = req.params.idUser;
        await userSchema.deleteUser(idUser);
        res.send("El usuario se elimino correctamente");
        res.status(200);
    } catch (ex) {
        console.log(ex);
        return {};
    }
});

router.post("/update/:idUser", async (req, res) => {
    try {
        let idUser = req.params.idUser;
        let upDateUser = req.body;
        await userSchema.findByIdAndUpdate(idUser,upDateUser);
        res.send("El usuario se actualizo correctamente");
        res.status(200);
    } catch (ex) {
        console.log(ex);
        return {};
    }
});
module.exports = router;
