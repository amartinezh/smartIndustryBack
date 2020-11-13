
import {Request, Response, NextFunction} from "express";
import { AuthController } from "../controllers/authController";
import * as auth from '../authService'
var cors = require('cors');
export class AuthRoutes { 
    
    public authController: AuthController = new AuthController();

    public routes(app): void {   
        
        app.use(cors());

        app.route('/user/val')
        .post(this.authController.valUser)

        app.route('/platform/val')
        .post(this.authController.valPlatform)
    }
    
}