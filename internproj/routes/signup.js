var express =require("express");
var router =express.Router();
 const {check,validationResult} =require('express-validator')
const {signup,signin} = require("../controllers/signup")

router.post("/signup",[check("name","name should be atleast 3 char").isLength({min:3})
,check("email","email is required").isEmail(),
check("password","password must be atleast 3 char").isLength({min:3})],signup);

router.post("/signin",[check("email","email is required").isEmail(),
check("encry_password1","password must be atleast 3 char").isLength({min:3})],signin);

// router.post("/registration",[])

module.exports = router;
