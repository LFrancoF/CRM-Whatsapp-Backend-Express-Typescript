import { Request, Response } from 'express';

import AuthUserService from '../services/UserServices/AuthUserService';
import { SendRefreshToken } from '../helpers/SendRefreshToken';
import { RefreshTokenService } from '../services/AuthService/refreshTokenService';

export const store = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token, serializedUser, refreshToken } = await AuthUserService({
        email,
        password
    });

    SendRefreshToken(res, refreshToken);

    res.status(200).json({
        token,
        refreshToken,
        user: serializedUser
    });
};

export const update = async (req: Request, res: Response) => {
    const token: string = req.cookies.jrt;

    if (!token) {
        throw new Error('ERR_SESSION_EXPIRED');
    }

    const { user, newToken, refreshToken } = await RefreshTokenService(
        res,
        token
    );

    SendRefreshToken(res, refreshToken);

    res.json({ token: newToken, user });
};

export const remove = async (_req: Request, res: Response) => {
    res.clearCookie('rtoken');
    res.send();
};
