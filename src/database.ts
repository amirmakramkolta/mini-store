import "reflect-metadata";
import dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import User from "./entities/User";
import Product from "./entities/Product"

dotenv.config();

let connection:DataSource

if(process.env.env_node=="dev"){
    connection = new DataSource({
        type:"mysql",
        port:parseInt(process.env.port as string),
        username:process.env.user,
        password:process.env.password,
        database:process.env.database,
        entities:[User, Product],
        synchronize:true
    })
}else{
    connection = new DataSource({
        type:"mysql",
        port:parseInt(process.env.port as string),
        username:process.env.user,
        password:process.env.password,
        database:process.env.database_test,
        entities:[User],
        synchronize:true
    })
}

export default connection;