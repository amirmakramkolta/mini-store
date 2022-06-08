import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/User';
import Product from '../models/Product';
import connection from '../database';
import { authentication, authorization } from '../middlewares/auth';
import { createProductValidation, deleteProductValidation, editProductValidation, getProductValidation } from '../middlewares/validation';
import { validate } from 'express-validation';

dotenv.config();

export const ProductRoutes = (app:express.Router)=>{
    // to create
    app.post("/create-product",
    validate(createProductValidation()),
    authentication(),
      async(req:express.Request,res:express.Response)=>{
        const {
            name,
            price,
            imageUrl
        } = req.body;

        const {authorization} = req.headers

        try{

            const userData = jwt.decode(authorization as string);

            if(userData == null){
                res.status(400);
                res.json("something wrong with data")
                return
            }

            const stringData = userData as jwt.JwtPayload
            const user = await User.findOneBy({id:(stringData.id as string)});

            if(user==null){
                res.status(400);
                res.json("User not found")
                return
            }

            const newProduct = Product.create({
                name,
                price,
                image_url:imageUrl,
                user
            })

            await newProduct.save();

            res.status(200)
            res.json({
                id:newProduct.id,
                name,
                price,
                imageUrl
            })

        }catch(err){
            console.log(err);
            res.status(500)
            res.send("Something happened wrong")
        }

    })
    // to get by id
    app.get("/get-product/:id",validate(getProductValidation()),async(req,res)=>{
        const {id} = req.params;
        try{
            const product = await Product.findOneBy({
                id,
            })
            if(product==null){
                res.status(404);
                res.send("Sorry product do not found")
            }else{
                res.status(200)
                res.json(product)
            }
        }catch(err){
            console.log(err)
            res.status(500)
            res.send("Something happened wrong")
        }
    })
    // to edit
    app.put("/edit-product/:id",
    validate(editProductValidation()),
    authentication(),
    authorization(),
    async(req,res)=>{
        const{
            name,
            price,
            imageUrl
        } = req.body
        const {id} = req.params
        try{
            await connection.createQueryBuilder()
                .update(Product)
                .set({
                    name,
                    price,
                    image_url:imageUrl
                })
                .where("id=:id",{id})
                .execute()
                const productToGo = await Product.findOneBy({id})

            res.status(200)
            res.json({
                ...productToGo
            })
        }catch(err){
            console.log(err)
            res.status(500);
            res.send("something wrong")
        }
    })
    // to delete
    app.delete("/delete-product/:id",
    validate(deleteProductValidation()),
    authentication(),
    authorization(),
    async(req,res)=>{
        const {id} = req.params;

        try{
            await Product.delete(id)

            res.status(200)
            res.json({
                id,
                state:"deleted"
            })

        }catch(err){
            console.log(err)
            res.status(500);
            res.send("something wrong")
        }

    })
}