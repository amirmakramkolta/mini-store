import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../entities/User';
import Product from '../entities/Product';
import connection from '../database';

dotenv.config();

export const ProductRoutes = (app:express.Router)=>{
    // to create
    app.post("/create-product",async(req,res)=>{
        const {
            name,
            price,
            imageUrl,
            token
        } = req.body;

        try{
            jwt.verify(token,(process.env.secret as string))
        }catch(err){
            console.log(err)
            res.status(403);
            res.json(`something wrong in JWT`)
            return
        }

        try{

            const userData = jwt.decode(token);

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
                imageUrl,
                token
            })

        }catch(err){
            console.log(err);
            res.status(500)
            res.send("Something happened wrong")
        }

    })
    // to get by id
    app.get("/get-product/:id",async(req,res)=>{
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
    app.put("/edit-product",async(req,res)=>{
        const{
            id,
            name,
            price,
            imageUrl,
            token
        } = req.body

        try{
            jwt.verify(token,(process.env.secret as string))
        }catch(err){
            console.log(err)
            res.status(403);
            res.json(`something wrong in JWT`)
            return
        }

        try{

            const userData = jwt.decode(token);

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

            if(user.id!=product?.user.id){
                res.status(401)
                res.send("you can edit on this product by this user")
                return
            }

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
                ...productToGo,
                token
            })
        }catch(err){
            console.log(err)
            res.status(500);
            res.send("something wrong")
        }
    })
    // to delete
    app.delete("/delete-product/:id",async(req,res)=>{
        const {id} = req.params;
        const {token} = req.body;

        try{
            jwt.verify(token,(process.env.secret as string))
        }catch(err){
            console.log(err)
            res.status(403);
            res.json(`something wrong in JWT`)
            return
        }

        try{

            const userData = jwt.decode(token);

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

            if(user.id!=product?.user.id){
                res.status(401)
                res.send("you can delete on this product by this user")
                return
            }

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