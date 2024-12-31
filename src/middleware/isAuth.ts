import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '../config/auth';

/*interface IUserRequest extends Request {
    user: { id: string; profile: string };
}*/

interface TokenPayload {
    id: string;
    username: string;
    profile: string;
    iat: number;
    exp: number;
}

const isAuth = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
        throw new Error('ERR SESSION EXPIRED');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.secret);
        const { id, profile } = decoded as TokenPayload;

        req.user = {
            id,
            profile
        };
    } catch {
        throw new Error('ERR INVALID TOKEN');
    }

    return next();
};

export default isAuth;
