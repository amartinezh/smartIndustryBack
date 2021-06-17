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

import { LogEnum } from "./models/smartIndustry/log.enum";
import * as socketio from "socket.io"
import { LogDAO } from "./repository/IndustryBackDB/logDAO";
import { ExternalPlatformGrowPos } from "./models/smartIndustry/external_platform";
import { resolve } from "url";

const axios = require('axios');

export class HttpRequestService {

    private static instance: HttpRequestService;

    private log: LogDAO
    private host: string
    private api_key: string
    private headers: any
    private token: string

    private constructor() {
        this.headers = {}
        this.headers['Access-Control-Allow-Origin'] = '*';
        this.log = new LogDAO()
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

