import * as dotenv from 'dotenv'; // IMPORTANT: First Import!
const result = dotenv.config();
import "reflect-metadata";

import { AppDataSource } from '../data-source';
import { Todo } from './todo';
import { User } from './user';

async function deleteDb() {

    await AppDataSource.initialize();
    console.log(`Database connection ready`);

    console.log(`Clearing Todos Table`);
    await AppDataSource.getRepository(Todo).delete({});

    console.log(`Clearing Users Table`);
    await AppDataSource.getRepository(User).delete({});


};


deleteDb()
    .then(() => {
        console.log(`Finish delete database`);
        process.exit(0);
    }).catch(err => {
        console.error(`Error delete database`, err);
    });
