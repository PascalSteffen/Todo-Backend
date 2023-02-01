import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { User } from "../models/user";
import { calculatePasswordHash } from "../utils";

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

export async function login(request: Request, response: Response, next: NextFunction) {


    try {

        logger.debug(`Called login`);

        const { email, password } = request.body;

        if (!email) {
            throw `Could not extract the email from the request.`;
        };

        if (!password) {
            throw `Could not extract the password from the request.`;
        };

        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('users')
            .where('email = :email', { email })
            .getOne()

        if (!user) {
            const message = 'Login denied';
            logger.error(`${message} - ${email}`);
            response.status(403).json({ message });
            return;
        };

        const passwordHash = await calculatePasswordHash(password, user.passwordSalt);

        if (passwordHash !== user.passwordHash) {
            const message = 'Login denied';
            logger.error(`${message} - user with ${email} has entered the wrong password`);
            response.status(403).json({ message });
            return;
        };

        logger.info(`User ${email} has logged in.`);

        const { isAdmin } = user;

        const authJwt = {
            userId: user.id,
            email,
            isAdmin
        };

        const authJwtToken = await jwt.sign(authJwt, JWT_SECRET);

        response.status(200).json({
            user: {
                email,
                isAdmin,
            },
            authJwtToken
        });

    }


    catch (error) {

        logger.error(`Error calling login`);
        return next(error);

    };

};