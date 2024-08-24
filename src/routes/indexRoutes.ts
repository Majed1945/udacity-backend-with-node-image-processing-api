import { Router } from 'express';
import imageRoutes from './imageRoutes';

const routes = Router();

routes.use('/images', imageRoutes);

export default routes;
