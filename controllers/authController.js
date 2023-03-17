const { userModel, usuariosSchema } = require("../db/schemas/userSchema");
const { roleModel, roleSchema } = require("../db/schemas/roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = async (req, res) => {
    const { userName, email, password, typeUser } = req.body;

    const newUser = new userModel({
        userName,
        email,
        password: await userModel.encryptPassword(password),
        typeUser,
    });
    if (typeUser) {
        const foundRoles = await roleModel.find({ name: { $in: typeUser } });
        newUser.typeUser = foundRoles.map((role) => role.id);
    } else {
        const role = await roleModel.findOne({ name: "user" });
        newUser.typeUser = [role._id];
    }

    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser._id },config.secret.SECRET,{
        expiresIn: 3600
    } );

    res.status(200).json({ token });
};

const signIn = async (req, res) => {
    const userFound = await userModel
        .findOne({ userName: req.body.userName })
        .populate("typeUser");

    if (!userFound) {
        return res.status(400).json({ message: "user not found" });
    }

    const matchPassword = await userModel.comparePassword(
        req.body.password,
        userFound.password
    );
    if(!matchPassword) return res.status(401).json(({token:null, message: "invalid password"}))

    const token = jwt.sign({id:userFound._id},config.secret.SECRET,{
        expiresIn: 3600
    })


    res.json({ token });
};

module.exports = {
    signUp,
    signIn,
};
