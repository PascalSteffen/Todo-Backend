import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { Todo } from "../models/todo";


export async function createTodo(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called createTodo`);

        const data = request.body;

        if (!data) {
            throw `No Data available.`;
        };

        const repository = AppDataSource.getRepository(Todo);

        const todo = repository
            .create({ ...data })

        await repository
            .save(todo);

        response.status(200).json({ todo });

    }


    catch (error) {

        logger.error(`Error calling createTodo`);
        return next(error);

    };

};