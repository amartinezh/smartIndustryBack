
import app from './app';
import * as http from "http"
import * as dotenv from "dotenv"

dotenv.config();
const PORT = `${process.env.PORT}`;
const HOST = `${process.env.HOST}`
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('smartIndustry server listening on port ' + PORT);
})