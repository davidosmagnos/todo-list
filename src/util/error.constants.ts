export class ErrorConstants{
        success = "00"
        todoNotExist = "01"
        reqEmpty = "02"
        titleNotProvided = "03"
        noTodoYet = "04"
        errors = {
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

    getError(code){
       let error = this.errors[code]
        error.code = code
        return error
    }

    getMessage(code){ 
        let error = this.errors[code];
        return error.message;
    }
}