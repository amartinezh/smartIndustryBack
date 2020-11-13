
import { DataBaseService } from '../../dataBaseService';
import * as uuid from "uuid";
import { LogEnum } from '../../models/smartIndustry/log.enum';
import { LogDAOGrowPos } from './logDAO';
import * as bcrypt from 'bcrypt'
import { ExternalPlatformGrowPos } from 'models/smartIndustry/external_platform';

export class ExternalPlatformDAOGrowPos {

    private log
    private connection;
    constructor() {
        this.connection = DataBaseService.getInstance();
        this.log = new LogDAOGrowPos()
    }

    public async insertExternalPlatform(externalPlatform: ExternalPlatformGrowPos) {
        try {
            let id = uuid.v4();
            externalPlatform.id = id;
            let con = await this.connection.getConnection()
            let query = await con.query('INSERT INTO external_platform SET ?', [externalPlatform]);
            con.release();
            return externalPlatform
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.insertExternalPlatform.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async getExternalPlatform() {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`SELECT
                        id,
                        name,
                        version,
                        api_key,
                        token,
                        url
                        FROM external_platform;`);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.getExternalPlatform.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async updateExternalPlatform(externalPlatform: ExternalPlatformGrowPos) {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`UPDATE external_platform SET
                        name = ?,
                        version = ?,
                        api_key = ?,
                        token = ?,
                        url = ?
                        WHERE id = ?;`,
                [externalPlatform.name,
                externalPlatform.version,
                externalPlatform.api_key,
                externalPlatform.token,
                externalPlatform.url,
                externalPlatform.id]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.updateExternalPlatform.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async updateApiKey(externalPlatform: ExternalPlatformGrowPos) {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`UPDATE external_platform SET
                        api_key = ?
                        WHERE id = ?;`,
                [externalPlatform.api_key,
                externalPlatform.id]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.updateExternalPlatform.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async deleteExternalPlatform(externalPlatformId: string) {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`DELETE FROM external_platform 
                        WHERE id = ?;`, [externalPlatformId]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.deleteExternalPlatform.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async val(api_key: string) {
        try {
            let con = await this.connection.getConnection();
            let query = await con.query(`SELECT
                        id,
                        name,
                        version,
                        api_key
                        FROM external_platform
                        WHERE api_key = ? ;`, [api_key]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${ExternalPlatformDAOGrowPos.name} -> ${this.val.name}: ${error}`)
            return new Error(error);
        }
    }
}
