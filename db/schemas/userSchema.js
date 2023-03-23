let appConfig = require("../../config");
const mongoose = require("mongoose");
const { roleModel} = require("../schemas/roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const usuariosSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        idDocument: { type: String },
        userName: { type: String },
        email: { type: String },
        password: { type: String },
        assetUser: { type: Boolean },
        typeUser: [
            {
                ref: "role",
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

usuariosSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usuariosSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const userModel = new mongoose.model("usuario", usuariosSchema);

// async function createUser(userNewUser){
//     try {

//         let result=await userModel.create(userNewUser);
//         return result;
//     }catch (ex) {
//         console.log(ex);
//         return {};

//     }

// }

const createUser = async (req, res) => {
    
    const {
        firstName,
        lastName,
        idDocument,
        userName,
        email,
        password,
        assetUser,
        typeUser
    } = req.body;

    const newUser = new userModel({
        firstName,
        lastName,
        idDocument,
        userName,
        email,
        password: await userModel.encryptPassword(password),
        assetUser,
        typeUser
    });
    if (typeUser) {
        const foundRoles = await roleModel.find({ name: { $in: typeUser } });
        newUser.typeUser = foundRoles.map((role) => role.id);
    } else {
        const role = await roleModel.findOne({ name: "user" });
        newUser.typeUser = [role._id];
    }

    const saveUser = await newUser.save();

//    const token = jwt.sign({ id: saveUser._id },appConfig.secret.SECRET);

     res.status(200).json("usuario creado");
};

async function deleteUser(id) {
    try {
        let result = await userModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function  getAllUser() {
    try {
        let filter = {};
        let cursor = userModel.find(filter).populate("typeUser").cursor();
        let result = [];
        let currentUser = await cursor.next();
        
        while (currentUser != null) {
            //userFound= await userModel.findById(currentUser._id).populate("typeUser");
            result.push(currentUser);
            currentUser = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function findById(idUser) {
    try {
        let cursor = userModel.findById(idUser).cursor();
        let user = await cursor.next();
        return user;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function findByIdAndUpdate(idUser, body) {
    try {
        
        const {
            firstName,
            lastName,
            idDocument,
            userName,
            email,
            password,
            assetUser,
            typeUser
        } = body;
    
        const userBody = {
            firstName,
            lastName,
            idDocument,
            userName,
            email,
            password: await userModel.encryptPassword(password),
            assetUser,
            typeUser
        };
        if (typeUser) {
            const foundRoles = await roleModel.find({ name: { $in: typeUser } });
            userBody.typeUser = foundRoles.map((role) => role.id);
        } else {
            const role = await roleModel.findOne({ name: "user" });
            userBody.typeUser = [role._id];
        }
        let result = userModel.findByIdAndUpdate(idUser, userBody);

        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
module.exports = {
    usuariosSchema,
    userModel,
    createUser,
    deleteUser,
    getAllUser,
    findById,
    findByIdAndUpdate,
};
