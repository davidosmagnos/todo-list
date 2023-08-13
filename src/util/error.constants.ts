export class ErrorConstants{
    static success = "00"
    static todoNotExist = "01"
    static reqEmpty = "02"
    static titleNotProvided = "03"
    static noTodoYet = "04"
    static errors = {
        "00":{
            message:"Successful",
            failure:false
        },
        "01":{
            message:"To do does not exist.",
            failure:true
        },
        "02":{
            message:"Request is Empty",
            failure:true
        },
        "03":{
            message:"No title was provided",
            failure:true
        },
        "04":{
            message:"There are no to dos yet",
            failure:true
        },
    }


    static getError(code){
       let error = this.errors[code]
        error.code = code
        return error
    }

    static getMessage(code){ 
        let error = this.errors[code];
        return error.message;
    }
}