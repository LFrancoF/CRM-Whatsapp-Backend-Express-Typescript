import { Response } from 'express';

export const SendRefreshToken = (res: Response, token: string): void => {
    res.cookie('rtoken', token, { httpOnly: true });
};
