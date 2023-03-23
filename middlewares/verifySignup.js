const { roleModel } = require("../db/schemas/roles");
const {userModel}=require("../db/schemas/userSchema")

const checkRolesExisted = async (req, res, next) => {
    try {
        let rolesResult = [];
        let roles = roleModel.find({}).cursor();
        let currentRole = await roles.next();
        while (currentRole != null) {
            rolesResult.push(currentRole.name);
            currentRole = await roles.next();
        }

        let roles1 = req.body.typeUser;
        let rolesTrue = true;
        let valor = "";
        if (roles1) {
            roles1.map((value) => {
                if (!rolesResult.includes(value) && rolesTrue) {
                    valor = value;
                    rolesTrue = false;
                }
            });
        }
        if (rolesTrue) {
            next();
        } else {
            return res.status(400).json({
                message: "El Tipo Usuario " + valor + " no existe",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const checkDuplicatedUsernameOrEmail =async(req,res,next)=>{
    const user= await userModel.findOne({userName: req.body.userName});
    if (user){
        return res.status(400).json({message: "The user already exist"});
    }
    const userEmail= await userModel.findOne({email: req.body.email});
    if (userEmail){
        return res.status(400).json({message: "The Email already exist"});
    }
    next();

}

module.exports = { checkRolesExisted, checkDuplicatedUsernameOrEmail };
