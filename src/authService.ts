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

import { ErrorGrowPos } from "./models/smartIndustry/error";
import * as jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    var token = req.headers['authorization']
    next()
    /*if (!token) {
        let error: ErrorGrowPos = new Error('Get out here!!');
        error.status = 401
        next(error);
        return;
    }
    token = token.replace('Bearer ', '')

    jwt.verify(token, 'fcasc3210sdfjnmku+98KJH45f', (err, user) => {
        if (err) {
            let error: ErrorGrowPos = new Error('Invalid Token');
            error.status = 401
            next(error);
        } else {
            res.locals.user = user
            next()
        }
    })*/
}

module.exports = auth