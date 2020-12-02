
import * as mysql from "mysql";

import * as util from "util";
import { LogGrowPos } from "./models/smartIndustry/log";
import { LogEnum } from "./models/smartIndustry/log.enum";
import * as dotenv from 'dotenv'
//import pool from './db/dev/pool';
import { Pool, Client } from 'pg';

export class DataBaseService {
    private log
    private static instance: DataBaseService;
    private connection;

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

            // the pool will emit an error on behalf of any idle clients
            // it contains if a backend error or network partition happens
            pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            });

            pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            });

            pool.query('SELECT NOW()', (err, res) => {
                console.log(err, res)
                pool.end()
            })

            this.connection = mysql.createPool({
                connectionLimit: 100,
                host: process.env.HOST,
                user: process.env.DBUSER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                timezone: process.env.TIMEZONE,

                typeCast: function castField(field, useDefaultTypeCasting) {
                    // We only want to cast bit fields that have a single-bit in them. If the field
                    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                    if ((field.type === "BIT") && (field.length === 1)) {

                        var bytes = field.buffer();

                        // A Buffer in Node represents a collection of 8-bit unsigned integers.
                        // Therefore, our single "bit field" comes back as the bits '0000 0001',
                        // which is equivalent to the number 1.
                        return (bytes[0] === 1);

                    }

                    return (useDefaultTypeCasting());

                }
            });
            this.connection.getConnection((err, connection) => {
                if (err) {
                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        console.error('Database connection was closed.')
                    }
                    if (err.code === 'ER_CON_COUNT_ERROR') {
                        console.error('Database has too many connections.')
                    }
                    if (err.code === 'ECONNREFUSED') {
                        console.error('Database connection was refused.')
                    }
                }
                if (connection) connection.release()

                return
            })
            this.log = new LogGrowPos()
        } catch (error) {
            //this.log.insertLog(LogEnum.ERROR, `${DataBaseService.name} -> ${this.constructor.name}: ${error}`)
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

    public getConnection() {
        try {
            return new Promise((resolve, reject) => {
                try {
                    this.pool.getConnection((err, connection) => {
                        if (err) {
                            reject(err);
                        }
                        connection.query = util.promisify(connection.query).bind(connection)
                        connection.beginTransaction = util.promisify(connection.beginTransaction).bind(connection)
                        connection.commit = util.promisify(connection.commit).bind(connection)
                        resolve(connection)
                    });
                } catch (error) {
                    this.log.insertLog(LogEnum.ERROR, `${DataBaseService.name} -> ${this.getConnection.name} promise: ${error}`)
                }
            });
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${DataBaseService.name} -> ${this.getConnection.name}: ${error}`)
        }
    }



    public query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }


}

