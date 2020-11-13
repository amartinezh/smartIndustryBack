
import { LogGrowPos } from "./models/smartIndustry/log";
import { LogEnum } from "./models/smartIndustry/log.enum";
import * as socketio from "socket.io"
import { ExternalPlatformDAOGrowPos } from "./repository/mentalHealthDB/external_platformDAO";
import { LogDAOGrowPos } from "./repository/mentalHealthDB/logDAO";
import { ExternalPlatformGrowPos } from "./models/smartIndustry/external_platform";
import { resolve } from "url";

const axios = require('axios');
const external_platform = new ExternalPlatformDAOGrowPos()

export class HttpRequestService {

    private static instance: HttpRequestService;

    private log: LogDAOGrowPos
    private host: string
    private api_key: string
    private headers: any
    private token: string

    private constructor() {
        this.headers = {}
        this.headers['Access-Control-Allow-Origin'] = '*';
        this.log = new LogDAOGrowPos()
        this.getExternalPLatform()
    }

    private async getExternalPLatform() {
        try {
            let res = await external_platform.getExternalPlatform()
            this.host = res[0].url
            this.api_key = res[0].api_key
            this.connectWithExternalPlatform()
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${HttpRequestService.name} -> ${this.getExternalPLatform.name}: ${error}`)
        }
    }

    static getInstance() {
        try {
            if (!HttpRequestService.instance) {
                HttpRequestService.instance = new HttpRequestService();
            }
            return HttpRequestService.instance;
        } catch (error) {
            console.log('An error occurred while the instance was returned ' + error + ` ${HttpRequestService.name} -> ${this.getInstance.name}`);
        }
    }

    private async connectWithExternalPlatform() {
        try {
            let res: any = await this.post(`/platform/val`,{api_key: this.api_key})
            this.token = res.tokenReturn
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${HttpRequestService.name} -> ${this.connectWithExternalPlatform.name}: ${error}`)
        }
    }

    public post(url: string, data: any, tries = 1) {
        return new Promise(async (resolve, reject) => {
            try {
                this.headers['Authorization'] = 'Bearer ' + this.token
                let response = await axios({ method: 'post', url: this.host + url, headers: this.headers, data })
                if (response.status === 200 || response.status === 201) {
                    resolve(response.data)
                } else if (response.status === 403) {
                    await this.connectWithExternalPlatform()
                    if (tries >= 5) {
                        reject()
                    }
                    this.post(url, data, tries++)
                } else {
                    reject()
                }
            } catch (error) {
                this.log.insertLog(LogEnum.ERROR, `${HttpRequestService.name} -> ${this.post.name}: ${error}`)
            }
        })
    }

}

