
import { DataBaseService } from '../../db/dev/dataBaseService';
import * as uuid from "uuid";
import { People } from 'models/smartIndustry/people';
import { LogEnum } from '../../models/smartIndustry/log.enum';
import { LogDAO } from './logDAO';
import * as bcrypt from 'bcrypt'

export class PeopleDAOGrowPos {

    private log: LogDAO;
    private connection;
    constructor() {
        this.connection = DataBaseService.getInstance();
        this.log = new LogDAO()
    }

    public async insertPeople(people: People) {
        try {
            let id = uuid.v4();
            people.apppassword = bcrypt.hashSync(people.apppassword, 10)
            people.id = id;
            let con = await this.connection.getConnection()
            //let query = await con.query('INSERT INTO people SET ?', [people]);
            con.release();
            return people
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.insertPeople.name}: ${error}`)
            throw new Error(error)
        }
    }


    public async getPeople() {
        try {
            var res = await this.connection.pool.query('SELECT id, name, apppassword FROM adm.tbl_people', "").then(res => { return res.rows[0] })
                .catch(e => console.error(e.stack));
            return res;
        } catch (error) {

            //this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.getPeople.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async getPeopleById(peopleId: People) {
        try {
            var res = await this.connection.pool.query('SELECT id, name, apppassword FROM adm.tbl_people where id='+peopleId.id, "").then(res => { return res.rows[0] })
                .catch(e => console.error(e.stack));
            return res;
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.getPeopleById.name}: ${error}`)
            return new Error(error);
        }
    }

    public async updatePeople(people: People) {
        try {
            people.apppassword = bcrypt.hashSync(people.apppassword, 10)
            let con = await this.connection.getConnection()
            let query = await con.query(`UPDATE people SET
                        name = ?,
                        apppassword = ?,
                        card = ?,
                        visible = ?
                        WHERE id = ?;`,
                [people.name,
                people.apppassword,
                people.id]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.updatePeople.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async deletePeople(peopleId: string) {
        try {
            let con = await this.connection.getConnection()
            let query = await con.query(`DELETE FROM people 
                        WHERE id = ?;`, [peopleId]);
            con.release();
            return query
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.deletePeople.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async val(id: string, pass: string) {
        try {
            let con = await this.connection.getConnection();
            let query = await con.query(`SELECT
                        id,
                        name,
                        apppassword,
                        card,
                        visible
                        FROM people
                        WHERE name = ? ;`, [id]);
            con.release();
            if (query.length > 0) {
                if (bcrypt.compareSync(pass, query[0].apppassword)) {
                    // Passwords match
                    query[0].apppassword = ''
                    return query
                } else {
                    // Passwords don't match
                    query = []
                    return query
                }
            } else {
                return []
            }
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${PeopleDAOGrowPos.name} -> ${this.val.name}: ${error}`)
            return new Error(error);
        }
    }

}
