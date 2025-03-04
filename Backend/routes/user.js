const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/userAuth");
require("dotenv").config();


router.post("/sign-up", async(req, res) =>{
    try{
        const {username, email, password, address} = req.body;
        
        if(username.length < 4){
            return res
            .status(400)
            .json({message: "Length should be greater than 3"});
        }

        if(password.length <= 5){
            return res
            .status(400)
            .json({message: "Password length should be more than 6 characters"});
        }
        const hashPass = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });
        
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username exists" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email exists" });
            }
        }

        await User.create({
            username,
            email, 
            password: hashPass, 
            address
        });
        
        return res
        .status(200)
        .json({message: "Sign Up Successful"});

    } catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
})
 
router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username && !email){
            return res.status(400).json({message: "Username or Email is required"});
        }
        const whereCondition = email ? { email } : { username };
        const existingUser = await User.findOne({ where: whereCondition });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const authClaims = {id: existingUser.id, role: existingUser.role};
        const token = jwt.sign({authClaims}, process.env.JWT_SECRET, {expiresIn:"10d"});

        res.status(200).json({ id: existingUser.id, role: existingUser.role, token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;