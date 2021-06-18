//    smartIndustry
//    Copyright (c) 2021 smartIndustry
//
//    This file is part of smartIndustry
//    @uthor: Andrés Mauricio Martinez Hincapié
//
//    smartIndustry is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    smartIndustry is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with smartIndustry.  If not, see <http://www.gnu.org/licenses/>.

import { Request, Response } from "express";
import { PeopleDAO } from "../repository/IndustryBackDB/peopleDAO";
import { Token } from "../models/interfaces/token.interface";
import { ErrorEnum } from "../models/smartIndustry/error";
import * as jwt from 'jsonwebtoken'
//import { } from "express-jwt";

let people = new PeopleDAO();

export class PeopleController {
	/*-------------------------------- app --------------------------------------------------------*/
	public async insertPeople(req: Request, res: Response, next) {
		try {
			res.send(await people.insertPeople(req.body));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400
			next(err);
			console.log(
				"An error occurred while inserting user :" +
				error +
				`: ${PeopleController.name} -> insertPeople`
			);
		}
	}

	public async getPeople(req: Request, res: Response, next) {
		try {
			res.send(await people.getPeople());
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting users :" +
				error +
				`: ${PeopleController.name} -> getPeople`
			);
		}
	}

	public async getPeopleById(req: Request, res: Response, next) {
		try {
			res.send(await people.getPeopleById(req.body));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting user :" +
				error +
				`: ${PeopleController.name} -> getPeopleById`
			);
		}
	}

	public async updatePeople(req: Request, res: Response, next) {
		try {
			res.send(await people.updatePeople(req.body));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400
			next(err);
			console.log(
				"An error occurred while updating user :" +
				error +
				`: ${PeopleController.name} -> updatePeople`
			);
		}
	}

	public async deletePeople(req: Request, res: Response, next) {
		try {
			res.send(await people.deletePeople(req.body.id));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 500
			next(err);
			console.log(
				"An error occurred while deleting user :" +
				error +
				`: ${PeopleController.name} -> deletePeople`
			);
		}
	}

}