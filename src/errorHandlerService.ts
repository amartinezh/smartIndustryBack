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

import { ErrorGrowPos } from "models/smartIndustry/error";


export class ErrorHandler {

    public routes(app): void {

        app.use((req, res, next) => {
            let error: ErrorGrowPos = new Error('Not Found');
            error.status = 404
            next(error);
        })

        app.use((error: ErrorGrowPos, req, res, next) => {
            res.status(error.status || 500)
            res.json({
                status: error.status,
                message: error.message
            })
        })
    }
}