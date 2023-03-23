//cargar dependencia
let userSchema = require("../db/schemas/userSchema");
const express = require("express");
const router = express.Router();
const authJwt = require("../middlewares");

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

router.post(
    "/create",
    [
        authJwt.verifyToken,
        authJwt.isAdmin,
        authJwt.checkRolesExisted,
        authJwt.checkDuplicatedUsernameOrEmail,
    ],
    userSchema.createUser
);

router.delete(
    "/delete/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
        try {
            let idUser = req.params.idUser;
            await userSchema.deleteUser(idUser);
            res.send("El usuario se elimino correctamente");
            res.status(200);
        } catch (ex) {
            console.log(ex);
            return {};
        }
    }
);

router.post(
    "/update/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
        try {
            let idUser = req.params.idUser;
            let upDateUser = req.body;
            await userSchema.findByIdAndUpdate(idUser, upDateUser);
            res.send("El usuario se actualizo correctamente");
            res.status(200);
        } catch (ex) {
            console.log(ex);
            return {};
        }
    }
);
module.exports = router;
