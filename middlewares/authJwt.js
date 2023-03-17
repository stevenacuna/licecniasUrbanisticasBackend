const jwt=require("jsonwebtoken")
const backendConfig=require("../config")
const {userModel}=require("../db/schemas/userSchema")
const {roleModel}=require("../db/schemas/roles")


const verifyToken = async (req, res, next) => {
    try {
        const token = await req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "no token provided"});
        const decoded=jwt.verify(token,backendConfig.secret.SECRET);
        req.userId=decoded.id;
        const user =await userModel.findById(req.userId,{password:0});
        console.log(user);
        if(!user) return res.status(404).json({message: "no user found"});
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
};



const isReviewer1 = async (req,res,next)=>{
    const user= await userModel.findById(req.userId);
    const role= await roleModel.find({_id: {$in: user.typeUser}});
    role.map((element)=>{
        if (element.name==="reviewer1") {
            next();
            return;
        }
        return res.status(403).json({message: "requiere un usuario JURÍDICO"});
    })
    
};


const isReviewer2 = async (req,res,next)=>{
    const user= await userModel.findById(req.userId);
    const role= await roleModel.find({_id: {$in: user.typeUser}});
    role.map((element)=>{
        if (element.name==="reviewer2") {
            next();
            return;
        }
        return res.status(403).json({message: "requiere un usuario ARQUITECTO"});
    })
    
};

const isReviewer3 = async (req,res,next)=>{
    const user= await userModel.findById(req.userId);
    const role= await roleModel.find({_id: {$in: user.typeUser}});
    role.map((element)=>{
        if (element.name==="reviewer3") {
            next();
            return;
        }
        return res.status(403).json({message: "requiere un usuario ING. ESTRUCTURAL"});
    })
    
};

const isAdmin = async (req,res,next)=>{
    const user= await userModel.findById(req.userId);
    const role= await roleModel.find({_id: {$in: user.typeUser}});
    role.map((element)=>{
        if (element.name==="admin") {
            next();
            return;
        }
        return res.status(403).json({message: "requiere un usuario ADMINISTRADOR"});
    })
    
};


module.exports = {
    verifyToken,
    isReviewer1,
    isReviewer2,
    isReviewer3,
    isAdmin
};
