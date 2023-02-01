import { NextFunction, Response, Request } from "express";
import { logger } from "../logger";


export function checkIfAdmin(request: Request, response: Response, next: NextFunction) {

    const user = request['user'];

    if (!user?.isAdmin) {
        logger.error(`The User is not a admin, access denied.`);
        response.sendStatus(403);
        return;
    };

    logger.info(`The user is a valid admin, granting access. `)

    next();

};