import { Router } from 'express';
import { resizeImage } from '../controllers/imageController';
import { validateImageMiddleware } from '../middlewares/validateImageMiddleware';
const imageRoutes = Router();

imageRoutes.get('/resize', validateImageMiddleware, resizeImage);

export default imageRoutes;
