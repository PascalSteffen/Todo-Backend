import * as dotenv from 'dotenv'; // IMPORTANT: First Import!
const result = dotenv.config();

if (result.error) {
    console.log('Error loading environment variables');
    process.exit(1);
};

import "reflect-metadata";
import * as express from 'express';
import { AppDataSource } from './data-source';
import { logger } from './logger';
import { isInteger } from './utils';
import { defaultErrorHandler } from './middlewares/default-error-handler';
import { findTodoById } from './routes/find-todo-by-id';
import { getAllTodos } from './routes/get-all-todos';
import { updateTodo } from './routes/update-todo';
import { createTodo } from './routes/create-todo';
import { deleteTodo } from './routes/delete-todo';
import { createUser } from './routes/create-user';
import { login } from './routes/login';
import { checkIfAuth } from './middlewares/auth-middleware';
import { checkIfAdmin } from './middlewares/admin-only-middleware';

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


function setupExpress() {

    app.use(cors({ origin: 'http://localhost:4200' }));
    app.use(bodyParser.json());

    app.route('/api/todos').get(checkIfAuth, getAllTodos);
    app.route('/api/todos/:todoId').get(checkIfAuth, findTodoById);

    app.route('/api/todos/:todoId').patch(checkIfAuth, updateTodo);
    app.route('/api/todos/').post(checkIfAuth, createTodo);
    app.route('/api/todos/:todoId').delete(checkIfAuth, deleteTodo);

    app.route('/api/users').post(/* checkIfAuth, checkIfAdmin, */ createUser);
    app.route('/api/login').post(login);

    app.use(defaultErrorHandler);

};

function startServer() {

    let port: number;
    const portEnv = process.env.PORT;
    const portArg = process.argv[2];

    if (isInteger(portEnv)) {
        port = parseInt(portEnv);
    };

    if (!port && isInteger(portArg)) {
        port = parseInt(portArg);
    };

    if (!port) {
        port = 9000;
    };

    app.listen(port, () => {

        logger.info(`Server ist running on Port http://localhost:${port}`);

    });

};

AppDataSource.initialize()
    .then(() => {
        logger.info('The Datasource has been init successfully');
        setupExpress();
        startServer();
    }).catch(err => {
        logger.error('The Datasource was not successfully init', err);
        process.exit(1);
    });