import { Logger } from "@nestjs/common";
import { ErrorConstants } from "./error.constants";
export class ResponseUtil{
    private readonly logger = new Logger(ResponseUtil.name)
    private errorConstants = new ErrorConstants()
    constructor(data:any,code:string){
        let response:any;
        if(code){
            response = this.errorConstants.getError(code);
            if(data){
                response.data = data
            }
        }
        return response
    }
}