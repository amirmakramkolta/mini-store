import connection from "./database";
import express from "express";
import {json} from 'body-parser';
import cors from 'cors'
import {ValidationError} from "express-validation";
import { UserRoutes } from "./controllers/UserEndpoints";
import { ProductRoutes } from "./controllers/ProductEndpoints";


const app = express();
const port = 5000;


connection.initialize()
    .then(()=>{
        console.log("Connceted to database")
        app.use(json())
        app.use(cors())
        app.use(function(err: Error, req:express.Request, res:express.Response, next:express.NextFunction) {
            if (err instanceof ValidationError) {
              return res.status(err.statusCode).json(err)
            }
          
            return res.status(500).json(err)
          })
        
        UserRoutes(app);
        ProductRoutes(app);
        
        app.listen(port,()=>{
            console.log("listen to http://localhost:5000")
        })
    })
    .catch((err)=>{
        console.log(err)
    })

