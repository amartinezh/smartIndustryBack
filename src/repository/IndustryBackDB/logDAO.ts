
import { DataBaseService } from '../../db/dev/dataBaseService';
import * as uuid from "uuid";
import { Log } from '../../models/smartIndustry/log';
import { LogEnum } from '../../models/smartIndustry/log.enum';

export class LogDAO {

    private connection;
    constructor() {
        try {
            this.connection = DataBaseService.getInstance();
        } catch (error) {
            console.log('An error occurred with getInstance() :' + error);
            throw new Error(error)
        }
    }

    public async insertLog(type: LogEnum, description: string) {
        try {
            let log = new Log()
            log.type = type
            log.description = description
            //log.user = user
            let con = await this.connection.getConnection()
            let query = await con.query('INSERT INTO log SET ?', log);
            con.release()
            return query
        } catch (error) {
            console.log('An error occurred while inserting a log :' + error + `: ${LogDAO.name} -> ${this.insertLog.name}`);
            throw new Error(error)
        }
    }

    public async getLog() {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`SELECT
                        id,
                        name
                        FROM log;`);
            con.release()
            return query
        } catch (error) {
            console.log('An error occurred while getting log :' + error + `: ${LogDAO.name} -> ${this.getLog.name}`);
            throw new Error(error)
        }
    }

    public async getLogById(LogId: string) {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`SELECT
                        id,
                        name
                        FROM log
                        WHERE ID = ?;`, [LogId]);
            con.release()
            return query
        } catch (error) {
            console.log('An error occurred while getting log :' + error + `: ${LogDAO.name} -> ${this.getLogById.name}`);
            throw new Error(error)
        }
    }



}
