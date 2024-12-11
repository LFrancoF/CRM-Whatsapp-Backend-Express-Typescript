import { Router } from 'express';
import * as QueueController from '../controllers/QueueController';

const queueRoutes = Router();

queueRoutes.get('/queue', QueueController.index);

export default queueRoutes;
