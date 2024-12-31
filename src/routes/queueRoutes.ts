import { Router } from 'express';
import * as QueueController from '../controllers/QueueController';
import isAuth from '../middleware/isAuth';

const queueRoutes = Router();

queueRoutes.get('/queue', isAuth, QueueController.index);

queueRoutes.post('/queue', isAuth, QueueController.createQueue);

queueRoutes.get('/queue/:id', isAuth, QueueController.showQueue);

queueRoutes.put('/queue/:id', isAuth, QueueController.updateQueue);

queueRoutes.delete('/queue/:id', isAuth, QueueController.deleteQueue);

export default queueRoutes;
