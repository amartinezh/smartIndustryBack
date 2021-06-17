
import { Request, Response } from "express";
import { PeopleDAOGrowPos } from "../repository/IndustryBackDB/peopleDAO";
import { Token } from "../models/interfaces/token.interface";
import { ErrorGrowPos } from "../models/smartIndustry/error";
import * as jwt from 'jsonwebtoken'
//import { } from "express-jwt";

let people = new PeopleDAOGrowPos();

export class AuthController {
	/*-------------------------------- app --------------------------------------------------------*/

	public async valUser(req: Request, res: Response, next) {
		try {

			var result = await people.val(req.body.name, req.body.apppassword);

			let token: Token;
			if (result.length > 0) {
				result.map((item: any) => {
					token = {
						id: item.id,
						name: item.name,
						rol: item.role,
						password: item.apppassword
					};
				});
				var tokenReturn = jwt.sign(token, "fcasc3210sdfjnmku+98KJH45f", {
					expiresIn: 60 * 60 * 24 // expires in 24 hours
				});		
				res.send({
					user: result[0],
					tokenReturn
				});
			} else {
				let err: ErrorGrowPos = new Error('Incorrect user or password');
				err.status = 403
				next(err);
			}
		} catch (error) {
			let err: ErrorGrowPos = new Error(error);
			err.status = 500
			next(err);
			console.log(
				"An error occurred while validating user :" +
				error +
				`: ${AuthController.name} -> val`
			);
		}
	}
}