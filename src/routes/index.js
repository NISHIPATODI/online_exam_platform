const express = require("express");
const router  = express.Router();
const UserAuthController=require("../controllers/index").UserAuthController;
const adminController=require("../controllers/index").adminController;

const VerifyUserJWT=require("../middleware/jwt").VerifyUserJWT;


router.get("/check",VerifyUserJWT,(req,res)=>{
    console.log("Value fetched from token userid, userType, email")
    console.log(req.user.studentId);
    console.log(req.user.userType);
    console.log(req.user.email);

res.send("Welcome ! Everything is perfectly setUp")
});

router.get("/checkHeroku",(req,res)=>{
    //console.log("Value fetched from token userid, accHash, email")
    
res.send("Welcome ! Everything is perfectly setUp")
});


router.post('/signup',UserAuthController.SignUp);
router.post('/login',UserAuthController.Login);
router.post('/delete',VerifyUserJWT,UserAuthController.Delete);
router.post('/changeuserpassword',VerifyUserJWT,UserAuthController.ChangePassword);


router.post('/invitelink',adminController.Invitelink);

module.exports = router;