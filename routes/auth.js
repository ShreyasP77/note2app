const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = process.env.JWT_SECRET

//ROUTE_1: Create a user using: POST request at /api/auth. Doesn't require authrntication. No login required

router.post('/', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email address').isEmail(),
  // password must be at least 5 chars long
  body('password', 'password length must be minimum 5 characters long').isLength({ min: 5 }),

], async (req, res) => {
  let success = false
  // If there are errors, return a bad request 

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  // const user = User(req.body)
  // user.save()
  //     res.send(req.body)
  // check user with this email already exists
  try {


    let user = await User.findOne({ email: req.body.email })
    //  || await bcrypt.compare(req.body.password,user.password)

    if (user) {
      return res.status(400).json({ success, error: "Sorry this email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secure_Pass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secure_Pass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const auth_token = jwt.sign(data, JWT_SECRET)
    let success = true
    res.json({ success, 'user_id': data.user.id, auth_token })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error occured");
  }
})

//ROUTE_2: Login end points: POST request at /api/auth/login. Doesn't require authrntication. No login required

router.post('/login', [

  body('email', 'Enter a valid email address').isEmail(),
  // password must be at least 5 chars long
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
  // If there are errors, return a bad request 
  let success = false
  const errors = validationResult(req);


  if (!errors.isEmpty()) {

    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {


    let user = await User.findOne({ email })

    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials[password error]" })
    }
    const data = {
      user: {
        id: user.id
      }
    }

    const auth_token = jwt.sign(data, JWT_SECRET)
    console.log(auth_token)
console.log(data)
    success = true
    console.log(success)
    
    res.json({ success, 'user_id': data.user.id, auth_token })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE_3: Login end points: POST request at /api/auth/getuser. Doesn't require authrntication. No login required
router.post('/getuser', fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    userId = req.user.id;

    let user = await User.findById(userId).select("-password")


    res.status(200).json(user)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router