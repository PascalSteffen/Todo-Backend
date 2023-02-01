import * as dotenv from 'dotenv'; // IMPORTANT: First Import!
const result = dotenv.config();
import "reflect-metadata";

import { TODOS, USERS } from './db-data';
import { AppDataSource } from '../data-source';
import { DeepPartial } from 'typeorm';
import { Todo } from './todo';
import { User } from './user';
import { calculatePasswordHash } from '../utils';

async function populateDb() {

    await AppDataSource.initialize();

    console.log(`Database connection ready`);

    const todos = Object.values(TODOS) as DeepPartial<Todo>[];

    const todoRepository = AppDataSource.getRepository(Todo);



    for (let todoData of todos) {

        console.log(`Inserting Course ${todoData.title}`);

        const todo = todoRepository.create(todoData);

        await todoRepository.save(todo);

    };

    const users = Object.values(USERS) as any[];

    for (let userData of users) {

        console.log(`Inserting User ${userData}`);

        const { email, plainTextPassword, passwordSalt, isAdmin } = userData;

        const user = AppDataSource
            .getRepository(User)
            .create({
                email,
                passwordSalt,
                passwordHash: await calculatePasswordHash(plainTextPassword, passwordSalt),
                isAdmin
            });


        await AppDataSource.manager.save(user);


    };

    const totalTodos = await todoRepository
        .createQueryBuilder()
        .getCount();

    console.log(`Data inserted - todos ${totalTodos}`);

};

populateDb()
    .then(() => {
        console.log(`Finish Populate database`);
        process.exit(0);
    }).catch(err => {
        console.error(`Error populate database`, err);
    });

