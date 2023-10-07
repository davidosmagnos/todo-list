import { Controller, Get, Param,Body,Post, HttpCode, Res, HttpStatus, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoReq } from './dto/add.request';
import { UpdateTodoReq } from './dto/update.request';
import { ErrorConstants } from 'src/util/error.constants';
import { ResponseUtil } from 'src/util/response.util';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}
    private errorConstant = new ErrorConstants();
    @Get("/")
    async getTodos(@Res() res,@Query("filter") filter:number){
        let response = await this.todoService.getTodos(filter);
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }

    @Get("/:id")
    async getOneTodoById(@Param("id") id:number,@Res() res){
        let response = await this.todoService.getOneTodoById(id);
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }

    @Post("/add")
    async addTodo(@Body() req:AddTodoReq, @Res() res){
        let response = await this.todoService.addTodo(req);
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }

    @Post("/update")
    async updateTodo(@Body() req:UpdateTodoReq,@Res() res){
        let response = await this.todoService.updateTodo(req)
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }

    @Post("/done/:id")
    async markDone(@Param("id") id:number,@Res() res){
        let response = await this.todoService.markDone(id)
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }
    @Post("/done")
    @HttpCode(400)
    done(){
        return new ResponseUtil(null,this.errorConstant.reqEmpty)
    }

    @Post("/delete/:id")
    async markArchive(@Param("id") id:number,@Res() res){
        let response = await this.todoService.markArchived(id)
        if(response['failure'] == true){
            res.status(HttpStatus.BAD_REQUEST)
        }
        res.send(response)
    }
    @Post("/delete")
    @HttpCode(400)
    archived(){
        return new ResponseUtil(null,this.errorConstant.reqEmpty)
    }
}
