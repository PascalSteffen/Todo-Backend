import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { logger } from '../logger';
import { Todo } from '../models/todo';

export async function findTodoById(request: Request, response: Response, next: NextFunction) {

    try {

        logger.debug(`Called findTodoById`);

        const todoId = request.params.todoId;

        if (!todoId) {
            throw 'Could not extract the course url from the request.'
        };

        const todo = await AppDataSource
            .getRepository(Todo)
            .findOneBy({
                id: Number(todoId)
            });

        if (!todoId) {
            const message = `Could not find a todo with id ${todoId}`;
            logger.error(message);
            response.status(404).json({ message });
            return;
        };

        response.status(200).json({
            todo,
        });

    }

    catch (error) {
        logger.error(`Error calling findTodoById`);
        return next(error);
    };

};