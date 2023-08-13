import { ErrorConstants } from "./error.constants";
export class ResponseUtil{
    constructor(data:any,code:string){
        let response:any;
        if(code){
            response = ErrorConstants.getError(code);
            if(data){
                response.data = data
            }
        }
        return response
    }
}