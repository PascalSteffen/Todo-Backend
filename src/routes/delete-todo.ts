import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { logger } from '../logger'
import { Todo } from '../models/todo';
import { isInteger } from '../utils';

export async function deleteTodo(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called deleteTodo`);

        const todoId = request.params.todoId;

        if (!isInteger(todoId)) {
            throw `Invalid courseId ${todoId}`
        };

        await AppDataSource
            .getRepository(Todo)
            .createQueryBuilder('todos')
            .delete()
            .from(Todo)
            .where('id = :todoId', { todoId })
            .execute();

        response.status(200).json({
            message: 'todo deleted.'
        });


    }

    catch (error) {
        logger.error(`Error calling deleteTodo`);
        return next(error);
    };



};