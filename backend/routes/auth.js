const express= require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');  // password hashing extension
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Rohanisagoodb$oy'; // to sign the web token i.e to estalish securre connection between server and db


// Route 1: Create a user using : POST + "auth/api/create user". Doesn't require login
router.post('/createuser',[
   body('name','Enter a valid name').isLength({ min: 3}),
   body('password','Enter a valid password').isLength( { min: 5}),
   body('email').isEmail()

] , async(req,res)=>{
   //If there are errors, return Basd request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   //Check wheter user with same email already exist

   //if try fails the execution will go toh catch command and that will return a error
try{
    let user = await User.findOne({email: req.body.email});
    //previous command will find of dupilicate email already exist in Databse or not.
    

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //creating user which will create user with given parameters
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
         id: user.id
      }

    }
   
    const authtoken = jwt.sign(data, JWT_SECRET);
    //  console.log(jwtData);
    //  res.json(user)
    res.json({authtoken})
   }
   catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");
   }
})

//Route 2: Authenticate a user using : POST + "auth/api/login". Doesn't require login
router.post('/login',[
   body('password',"password can not be blank").exists(),
   body('email').isEmail(),

] , async(req,res)=>{

   let success = false;

   //If there are errors, return Basd request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const{email,password} = req.body;
   try{
      let user = await User.findOne({email});
      if(!user){
         success = false
         return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const passwordCompare =  await bcrypt.compare(password, user.password);
      if(!passwordCompare)
      {
         success = false
         return res.status(400).json({ success, error: "Please try to login with correct credentials" });      }

      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
    res.json({ success, authtoken })

   } catch(error){
      console.log(error.message);
      res.status(500).send("Internal server error");
   }

})

// Route 3: Get logged in user details using : POST + "auth/api/getuser". Doesn't require login
router.post('/getuser', fetchuser, async(req,res)=>{

 try {
   userId= req.user.id;
   const user= await User.findById(userId).select("-password")
   res.send(user)
   
} catch (error) {

   console.log(error.message);
   res.status(500).send("Internal server error");
}
})

module.exports = router