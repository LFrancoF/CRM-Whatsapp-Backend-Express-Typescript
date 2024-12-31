import { verify } from 'jsonwebtoken';
import { Response as Res } from 'express';

import User from '../../models/User';
import ShowUserService from '../UserServices/ShowUserService';
import authConfig from '../../config/auth';
import {
    createAccessToken,
    createRefreshToken
} from '../../helpers/CreateToken';

interface RefreshTokenPayload {
    id: string;
    tokenVersion: number;
}

interface Response {
    user: User;
    newToken: string;
    refreshToken: string;
}

export const RefreshTokenService = async (
    res: Res,
    token: string
): Promise<Response> => {
    try {
        const decoded = verify(token, authConfig.refreshSecret);
        const { id, tokenVersion } = decoded as RefreshTokenPayload;

        const user = await ShowUserService(id);

        if (user.tokenVersion !== tokenVersion) {
            res.clearCookie('rtoken');
            throw new Error('ERR_SESSION_EXPIRED');
        }

        const newToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        return { user, newToken, refreshToken };
    } catch {
        res.clearCookie('rtoken');
        throw new Error('ERR_SESSION_EXPIRED');
    }
};
