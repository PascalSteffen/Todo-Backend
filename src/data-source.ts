import { DataSource } from "typeorm";
import { Todo } from "./models/todo";
import { User } from "./models/user";


export const AppDataSource = new DataSource({

    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: true,
    entities: [
        Todo,
        User
    ],
    synchronize: true,
    logging: true

});