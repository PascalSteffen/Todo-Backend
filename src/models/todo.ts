import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'TODOS' // DB-Table-Name
})
export class Todo {

    @PrimaryGeneratedColumn() // Set id to Primary-Key
    id: number;

    @Column()
    title: string;

    @Column()
    finish: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdateAt: Date;

};