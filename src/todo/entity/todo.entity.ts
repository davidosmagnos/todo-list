import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm'

@Entity('todos')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    todo_id:number

    @Column()
    todo_title:string

    @Column()
    todo_desc:string

    @Column()
    todo_status:number

    @CreateDateColumn({type:'timestamp'})
    created_date:number
}