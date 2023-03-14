let express=require("express");
let authController=require("../controllers/authController"); 
const router=express.Router();


router.post("/signup",authController.signUp);
router.post("/signin",authController.signIn);



module.exports=router;

