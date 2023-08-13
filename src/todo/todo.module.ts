import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoEntity } from './entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddTodoReq } from './dto/add.request';

@Module({
  imports:[TodoEntity,TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService,TodoEntity,AddTodoReq],
  controllers: [TodoController]
})
export class TodoModule {}
