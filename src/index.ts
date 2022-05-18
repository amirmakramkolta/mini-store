import connection from "./database";
import express from "express";
import {json} from 'body-parser';
import cors from 'cors'
import { UserRoutes } from "./handlers/UserEndpoints";
import { ProductRoutes } from "./handlers/ProductEndpoints";


const app = express();
const port = 5000;


connection.initialize()
    .then(()=>{
        console.log("Connceted to database")
        app.use(json())
        app.use(cors())
        
        UserRoutes(app);
        ProductRoutes(app);
        
        app.listen(port,()=>{
            console.log("listen to http://localhost:5000")
        })
    })
    .catch((err)=>{
        console.log(err)
    })

