import { Router } from 'express';

import queueRoutes from './queueRoutes';

const routes = Router();

routes.use(queueRoutes);

export default routes;
