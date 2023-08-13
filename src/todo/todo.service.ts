import { Injectable,Logger } from '@nestjs/common';
import {Repository} from 'typeorm'
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoReq } from './dto/add.request';
import { ResponseUtil } from 'src/util/response.util';
import { ErrorConstants } from 'src/util/error.constants';

@Injectable()
export class TodoService {

    constructor(  
        @InjectRepository(TodoEntity)
        private todoRepository:Repository<TodoEntity>
    ){}
    private readonly logger = new Logger(TodoService.name);

    async getTodos(){
        let list:any;
        try{
            list = await this.todoRepository.find();
            if(!list){
                throw new Error(ErrorConstants.noTodoYet);
            }
        }catch(err){
            this.logger.error(ErrorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
       
        return new ResponseUtil(list,ErrorConstants.success);
    }

    async getOneTodoById(id:number){
        let oneTodo:any;
        try{
            oneTodo = await this.todoRepository.findOne({
                where:{
                    todo_id:id
                }
            })
            if(!oneTodo){
                throw new Error(ErrorConstants.todoNotExist)
            }
            this.logger.log(JSON.stringify(oneTodo))
        }catch(err){
            this.logger.error(ErrorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
        return new ResponseUtil(oneTodo,ErrorConstants.success)
    }

    async addTodo(req:AddTodoReq){
        try{
            if(!req || JSON.stringify(req) == '{}'){
                throw new Error(ErrorConstants.reqEmpty);
            }
            else if(!req.toDoTitle){
                throw new Error(ErrorConstants.titleNotProvided)
            }
            const todo = this.todoRepository.create({
                todo_title:req.toDoTitle||"-",
                todo_desc:req.toDoDesc||"-",
                todo_status:1 //TODO: create constant
           })
           await this.todoRepository.save(todo)
           return new ResponseUtil(null,ErrorConstants.success)
        }catch(err){
            this.logger.error(ErrorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
    }
    getErrorCode(err){
        let er = err.toString();
        return er.substring(er.indexOf('0'))
    }
}
