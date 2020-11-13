
import { DataBaseService } from '../../dataBaseService';
import * as uuid from "uuid";
import { LogGrowPos } from '../../models/smartIndustry/log';
import { LogEnum } from '../../models/smartIndustry/log.enum';

export class LogDAOGrowPos {

    private connection;
    constructor() {
        this.connection = DataBaseService.getInstance();
    }

    public async insertLog(type: LogEnum, description: string) {
        try {
            let log = new LogGrowPos()
            log.type = type
            log.description = description
            //log.user = user
            let con = await this.connection.getConnection()
            let query = await con.query('INSERT INTO log SET ?', log);
            con.release()
            return query
        } catch (error) {
            console.log('An error occurred while inserting a log :' + error + `: ${LogDAOGrowPos.name} -> ${this.insertLog.name}`);
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
            console.log('An error occurred while getting log :' + error + `: ${LogDAOGrowPos.name} -> ${this.getLog.name}`);
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
            console.log('An error occurred while getting log :' + error + `: ${LogDAOGrowPos.name} -> ${this.getLogById.name}`);
            throw new Error(error)
        }
    }



}
