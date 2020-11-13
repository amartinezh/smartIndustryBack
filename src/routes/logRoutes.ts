
import {Request, Response, NextFunction} from "express";
import { LogController } from "../controllers/logController";
var cors = require('cors');
export class LogRoutes { 
    
    public logController: LogController = new LogController();

    public routes(app): void {   
        
        app.use(cors());

        app.route('/log')
        .post(this.logController.insertLog)

        app.route('/log/get')
        .post(this.logController.getLog)
        
    }
    
}