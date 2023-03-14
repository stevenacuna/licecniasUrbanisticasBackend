let appConfig=require("../../config")
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");

const usuariosSchema = new mongoose.Schema(
    {
        
        firstName: { type: String  },
        lastName: { type: String},
        idDocument: { type: String},
        userName: { type: String},
        email:{type:String},
        password: { type: String},
        assetUser: { type: Boolean},
        typeUser: [{
            ref:"role",
            type:mongoose.Schema.Types.ObjectId

        }]
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
    return await bcrypt.compare(password, receivedPassword)
  }

const userModel = new mongoose.model("usuario", usuariosSchema);



// async function createUser(userNewUser){
//     try {
//         let newUser= new userModel();
//         newUser=userNewUser;
//         let result=await newUser.save();
//         return result;
//     }catch (ex) {
//         console.log(ex);
//         return {};
        
//     }

// }

async function createUser(userNewUser){
    try {
        
        let result=await userModel.create(userNewUser);
        return result;
    }catch (ex) {
        console.log(ex);
        return {};
        
    }

}
async function deleteUser(id){
    try {
        let result= await userModel.findByIdAndRemove(id).exec();
        return result;
    }catch (ex) {
        console.log(ex);
        return {};
        
    }
}
async function getAllUser(){
    try{
        let filter={};
        let cursor=userModel.find(filter).cursor();
        let result=[];
        let currentUser=await cursor.next();
        while(currentUser !=null){
            result.push(currentUser);
            currentUser=await cursor.next();
        }
        return result;

    }catch (ex) {
        console.log(ex);
        return {};
        
    }
}
async function findById(idUser){
    try {
        let cursor=userModel.findById(idUser).cursor();
        let user=await cursor.next()
        return user;
    }catch (ex) {
        console.log(ex);
        return {};
        
    }
}

async function findByIdAndUpdate(idUser,body){
    try {
        let result=userModel.findByIdAndUpdate(idUser,body)
        
        return result;
    }catch (ex) {
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
    findByIdAndUpdate
 };