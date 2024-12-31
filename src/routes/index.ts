import { Router } from 'express';

import queueRoutes from './queueRoutes';
import contactRoutes from './contactRoutes';
import authRoutes from './authRoutes';

const routes = Router();

routes.use(queueRoutes);
routes.use(contactRoutes);
routes.use('/auth', authRoutes);

export default routes;
