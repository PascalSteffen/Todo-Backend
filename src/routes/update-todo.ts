import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { Todo } from "../models/todo";
import { isInteger } from "../utils";


export async function updateTodo(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called updateTodo`);

        const todoId = request.params.todoId;
        const changes = request.body;

        if (!isInteger(todoId)) {
            throw `Invalid course id ${todoId}`;
        };

        await AppDataSource
            .createQueryBuilder()
            .update(Todo)
            .set(changes)
            .where('id = :todoId', { todoId })
            .execute();

        response.status(200).json({
            message: `Todo ${todoId} was updated successfully.`
        });

    }


    catch (error) {

        logger.error(`Error calling updateTodo`);
        return next(error);

    };

};