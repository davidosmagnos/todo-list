import { Controller, Get, Param,Body,Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoReq } from './dto/add.request';
import { UpdateTodoReq } from './dto/update.request';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}

    @Get("/")
    async getTodos(){
        return await this.todoService.getTodos();
    }

    @Get("/:id")
    async getOneTodoById(@Param("id") id:number){
        return await this.todoService.getOneTodoById(id);
    }

    @Post("/add")
    async addTodo(@Body() req:AddTodoReq){
        return await this.todoService.addTodo(req);
    }

    @Post("/update")
    async updateTodo(@Body() req:UpdateTodoReq){
        return await this.todoService.updateTodo(req)
    }
}
