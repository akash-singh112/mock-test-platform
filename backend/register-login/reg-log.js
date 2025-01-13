const express = require('express');
const router = express.Router();
const User = require('../db/userSchema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async (req,res)=>{
    try {
        //get all details of user from user-> stored in req.body
        const {firstname,middlename,lastname,email,password} = req.body;

        //check for empty fields:if any then give flag
        if(!firstname || !email || !password){
            return res.status(406).send('Please enter all required fields');
        }

        //check if user already exists in DB
        const ifExisting = await User.findOne({email});

        if(ifExisting){
            return res.send('This user already exists! Please try to login');
        }

        //encrypt the password
        const hashedvalue = await bcrypt.hash(password,15);

        //store in database
        const user1 = await User.create({
            firstname,
            middlename,
            lastname,
            email,
            password : hashedvalue
        })

        //generate secret token 
        const tkn = jwt.sign({id:user1._id,email},process.env.SECRET_KEY,{
            expiresIn:'1h'
        });
        user1.tkn = tkn;
        //for security reasons, also we dont need password anymore so discarding it
        user1.password = undefined;
        //200 => successful
        res.status(200).json({message : 'Registration successful' , user1});
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/login',async (req,res)=>{
    try {
        //get user details
        const {email,password} = req.body;

        //check if both email and password are filled up
        if(email==undefined || password==undefined){
            return res.status(400).send('Please enter all fields');
        }

        //check if user exists in DB
        const user = await User.findOne({email});
        if(user==undefined){
            return res.status(400).send('This user does not exist');
        }

        //check for correctpassword
        const correct = await bcrypt.compare(password,user.password);
        if(!correct){
            return res.status(400).send('Incorrect password');
        }

        //find name of user
        const name11 = user.firstname;

        //generate jwt token for secure access
        const tkn = jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn:'1h'
        });
        user.tkn = tkn;
        user.password = undefined;

        //store cookies and send successful login message
        res.status(200).cookie('cookie1',tkn,{ maxAge : 360000 , httpOnly:true }).json({
            message:'Login successful!',
            success:true,
            name:name11,
            userData:user
        });

    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router