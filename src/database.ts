import "reflect-metadata";
import dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import User from "./models/User";
import Product from "./models/Product"

dotenv.config();

let connection:DataSource

if(process.env.ENV_NODE == "dev"){
    connection = new DataSource({
        type:"mysql",
        host:process.env.HOST,
        port:parseInt(process.env.PORT as string),
        username:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
        entities:[User, Product],
        synchronize:true
    })
}else{
    connection = new DataSource({
        type:"mysql",
        host:process.env.HOST,
        port:parseInt(process.env.PORT as string),
        username:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE_TEST,
        entities:[User, Product],
        synchronize:true,
        dropSchema:true
    })
}

export default connection;