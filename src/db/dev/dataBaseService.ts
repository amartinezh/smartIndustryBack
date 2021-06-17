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

//import * as util from "util";
import { LogDAO } from '../../repository/IndustryBackDB/logDAO';
import { LogEnum } from "../../models/smartIndustry/log.enum";
import * as dotenv from 'dotenv'
import { Pool, Client } from 'pg';

export class DataBaseService {
    private log: LogDAO;
    public static instance: DataBaseService;
    private connection;
    private pool;

    private constructor() {
        try {

            dotenv.config();

            const pool = new Pool({
                user: process.env.DBUSER,
                host: process.env.HOST,
                database: process.env.DATABASE,
                password: process.env.PASSWORD,
                port: 5432
            });

            this.pool = pool;

            // the pool will emit an error on behalf of any idle clients
            // it contains if a backend error or network partition happens
            pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            });

            /*pool.query('SELECT NOW()', (err, res) => {
                console.log(err, res)
                pool.end()
            })*/

            
            
        } catch (error) {
            this.log = new LogDAO();
            this.log.insertLog(LogEnum.ERROR, `${DataBaseService.name} -> ${this.constructor.name}: ${error}`)
            console.log('An error occurred while the connection was created ' + error + ` ${DataBaseService.name} -> constructor`);
        }
    }

    static getInstance() {
        try {
            if (!DataBaseService.instance) {
                DataBaseService.instance = new DataBaseService();
            }
            return DataBaseService.instance;
        } catch (error) {
            //this.log.insertLog(LogEnum.ERROR, `${DataBaseService.name} -> ${this.getInstance.name}: ${error}`)
            console.log('An error occurred while the instance was returned ' + error + ` ${DataBaseService.name} -> ${this.getInstance.name}`);
        }
    }

    public async query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }


}

