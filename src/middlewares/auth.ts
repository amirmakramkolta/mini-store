import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';

dotenv.config();

export function authorization(){
    return (req:express.Request, res:express.Response, next: express.NextFunction)=>{

        const {authorization} = req.headers;

        if(!authorization){
            res.status(401).send("unauthorizated request");
            return;
        }else{
            jwt.verify(authorization,(process.env.SECRET as string),(err,decodes)=>{
                if(err){
                    res.status(400).send("bad request");
                    return;
                }else{
                    
                    next();
                }
            })
        }

    }
}

export function authentication(){
    return async (req: express.Request, res: express.Response, next: express.NextFunction)=>{

        const {authorization} = req.headers;
        const {id} = req.params
        const decode = jwt.decode(authorization as string) as jwt.JwtPayload;
        const user =  await User.findOneBy({id:(decode.id as string)})
        if(!user){
            res.status(400).send("Weird request");
            return;
        }

        const product = await Product.findOne({
            relations:{
                user:true
            },
            select:{
                id:true,
                user:{
                    id:true,
                }
            },
            where:{
                id
            }
        })

        if(!product){
            res.status(400).send("Bad request")
            return
        }

        if(user.id!=product?.user.id){
            res.status(403).send("Forbidden")
            return
        }

        next();
    }
} 
