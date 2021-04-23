import * as dotenv from "dotenv";

export class ConfigModel{

    port: string;
    
    constructor(){
        dotenv.config();
        this.port=process.env.PORT;
    }
}