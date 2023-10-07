import { Injectable,Logger } from '@nestjs/common';
import {Repository} from 'typeorm'
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoReq } from './dto/add.request';
import { ResponseUtil } from 'src/util/response.util';
import { ErrorConstants } from 'src/util/error.constants';
import { UpdateTodoReq } from './dto/update.request';
import { TodoConstants } from 'src/util/todo.constants';

@Injectable()
export class TodoService {

    constructor(  
        @InjectRepository(TodoEntity)
        private todoRepository:Repository<TodoEntity>
    ){}
    private readonly logger = new Logger(TodoService.name);
    private errorConstants = new ErrorConstants()

    async getTodos(){
        let list:any;
        try{
            list = await this.todoRepository.find();
            if(!list){
                throw new Error(this.errorConstants.noTodoYet);
            }
        }catch(err){
            this.logger.error(this.errorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
       
        return new ResponseUtil(list,this.errorConstants.success);
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
                throw new Error(this.errorConstants.todoNotExist)
            }
            this.logger.log(JSON.stringify(oneTodo))
        }catch(err){
            this.logger.error(this.errorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
        return new ResponseUtil(oneTodo,this.errorConstants.success)
    }

    async addTodo(req:AddTodoReq){
        try{
            if(!req || JSON.stringify(req) == '{}'){
                throw new Error(this.errorConstants.reqEmpty);
            }
            else if(!req.toDoTitle){
                throw new Error(this.errorConstants.titleNotProvided)
            }
            const todo = this.todoRepository.create({
                todo_title:req.toDoTitle||"-",
                todo_desc:req.toDoDesc||"-",
                todo_status:TodoConstants.TODO_STATUS_ACTIVE
           })
           await this.todoRepository.save(todo)
           return new ResponseUtil(null,this.errorConstants.success)
        }catch(err){
            this.logger.error(this.errorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
    }
    getErrorCode(err){
        let er = err.toString();
        return er.substring(er.indexOf('0'))
    }

    async updateTodo(req:UpdateTodoReq){
        try{
            if(!req || JSON.stringify(req) == '{}'){
                throw new Error(this.errorConstants.reqEmpty);
            }
            else if(!req.toDoTitle){
                throw new Error(this.errorConstants.titleNotProvided)
            }
            const todo = this.todoRepository.create({
                todo_title:req.toDoTitle||"-",
                todo_desc:req.toDoDesc||"-",
                todo_status:TodoConstants.TODO_STATUS_ACTIVE
           })
           await this.todoRepository.update(req.code,todo)
           return new ResponseUtil(null,this.errorConstants.success)
        }catch(err){
            this.logger.error(this.errorConstants.getMessage(this.getErrorCode(err)))
            return new ResponseUtil(null,this.getErrorCode(err))
        }
    }
}
