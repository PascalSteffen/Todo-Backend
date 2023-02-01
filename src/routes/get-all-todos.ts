import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { logger } from '../logger'
import { Todo } from '../models/todo';

export async function getAllTodos(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called getAllTodos`, request['user']);
        const todos = await AppDataSource
            .getRepository(Todo)
            .createQueryBuilder("todos")
            .orderBy("todos.id")
            .getMany();

        response.status(200).json({ todos });

    }

    catch (error) {
        logger.error(`Error calling getAllTodos`);
        return next(error);
    };



};