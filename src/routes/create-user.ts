import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { User } from "../models/user";
import { calculatePasswordHash } from "../utils";

const crypto = require('crypto');

export async function createUser(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called createUser`);

        const { email, password, isAdmin } = request.body;

        if (!email) {
            throw `Could not extract the email from the request.`;
        };

        if (!password) {
            throw `Could not extract the password from the request.`;
        };

        const repository = AppDataSource.getRepository(User);

        const user = await repository.createQueryBuilder('users')
            .where('email = :email', { email })
            .getOne();

        if (user) {
            const message = `User with this email ${email} already exist.`;
            logger.error(message);
            response.status(500).json({ message });
            return;
        };

        const passwordSalt = crypto.randomBytes(256).toString('hex');
        const passwordHash = await calculatePasswordHash(password, passwordSalt);

        const newUser = repository.create({
            email,
            passwordHash,
            passwordSalt,
            isAdmin
        });

        await AppDataSource.manager.save(newUser);

        logger.info(`User ${email} has been created.`);

        response.status(200).json({ email });

    }


    catch (error) {

        logger.error(`Error calling createUser`);
        return next(error);

    };

};