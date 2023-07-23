const express = require('express');
const router = express.Router();
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MynameisEndtoEndYouTubeChanne1$#";

router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'wrong pass').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password,salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'wrong pass').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let input = await User.findOne({ email });
            if(!input){
                return res.status(400).json({ errors: "Try Login with correct credentials" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password,input.password)
            if(!pwdCompare){
                return res.status(400).json({ errors: "Try Login with correct credentials" });
            }
            
            const data = {
                user:{
                    id:input.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true,authToken:authToken });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })
module.exports = router;