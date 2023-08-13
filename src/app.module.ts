import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {} from "dotenv/config"
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:process.env.host,
    port:parseInt(process.env.port),
    username:"root",
    password:"root",
    database:"todolist",
    synchronize:true,
    autoLoadEntities:true
  }), TodoModule],
  controllers: [AppController],
  providers: [AppService,TodoEntity],
})
export class AppModule {}
