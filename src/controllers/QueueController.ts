import { Request, Response } from 'express';
import ListQueues from '../services/QueueService/listQueues';
import CreateQueue from '../services/QueueService/createQueue';
import ShowQueue from '../services/QueueService/showQueue';
import UpdateQueue from '../services/QueueService/updateQueue';
import DeleteQueue from '../services/QueueService/deleteQueue';

export const index = async (_req: Request, res: Response) => {
    try {
        const queues = await ListQueues();
        res.status(200).json(queues);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error', error: error });
    }
};

export const createQueue = async (req: Request, res: Response) => {
    try {
        const { name, color, greetingMessage } = req.body;
        const datos: { name: string; color: string; greetingMessage: string } =
            {
                name,
                color,
                greetingMessage
            };
        const queue = await CreateQueue(datos);
        res.status(200).json(queue);
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const showQueue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const queue = await ShowQueue(id);
        res.status(200).json(queue);
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const updateQueue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const queue = await UpdateQueue(id, req.body);
        res.status(200).json(queue);
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

export const deleteQueue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await DeleteQueue(id);
        res.status(200).send('Registro eliminado');
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
