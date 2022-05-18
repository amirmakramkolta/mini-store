import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt'
import express from 'express';
import User from '../entities/User';

dotenv.config();

export const UserRoutes = (app:express.Router) => {
    app.post("/create-user",async (req,res)=>{
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        try{
            const newUser = User.create({
                first_name: firstName as string,
                last_name: lastName as string,
                email: (email as string).toLowerCase(),
                password: bycrypt.hashSync(password + process.env.pepper, parseInt(process.env.salt as string))
            });

            await newUser.save();

            const token = jwt.sign({id:newUser.id, email:newUser.email},(process.env.secret as string));

            res.status(200);
            res.json({
                token
            })

        }catch(err){
            console.log(err)
            res.status(500)
            res.send("Something happened wrong")
        }
    });
    app.post("/signin",async(req,res)=>{
        const {
            email,
            password
        } = req.body;

        try{
            const user =await User.findOne({where:{email}});
            if(user==null){
                res.status(404);
                res.send("sorry user or password are invaled")
            }else if(!bycrypt.compareSync(password+process.env.pepper, user.password)){
                res.status(404);
                res.send("sorry user or password are invaled")
            }else{
                const token = jwt.sign({id:user.id, email:user.email},(process.env.secret as string));
                res.status(200);
                res.json({
                    token
                })
            }
        }catch(err){
            console.log(err)
            res.status(500)
            res.send("something happened wrong")
        }
    })
}