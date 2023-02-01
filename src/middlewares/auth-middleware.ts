import { NextFunction, Response, Request } from "express";
import { logger } from "../logger";

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

export function checkIfAuth(request: Request, response: Response, next: NextFunction) {

    const authJwt = request.headers.authorization;

    if (!authJwt) {
        logger.info(`The auth JWT is not present, access denied.`);
        response.sendStatus(403);
        return;
    };

    checkJwtValidity(authJwt)
        .then(user => {
            logger.info(`Auth JWT successfully decoded:`, user);

            request['user'] = user;

            next();
        })
        .catch(err => {
            logger.error(`Could not validate the auth JWT, access denied.`, err);
            response.sendStatus(403);
        });

};


async function checkJwtValidity(authJwtToken: string) {

    const user = await jwt.verify(authJwtToken, JWT_SECRET);
    logger.info(`Found user details in JWT:`, user);

    return user;

};