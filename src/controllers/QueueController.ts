import { Request, Response } from 'express';

export const index = (_req: Request, res: Response): void => {
    console.log('Ruta de Departamentos');
    res.send('DESARROLLO, COMERCIAL, ADMINISTRACION');
};
