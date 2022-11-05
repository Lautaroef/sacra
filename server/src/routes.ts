import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/uploadImage';
import OrphansController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphansController.index);
routes.get('/orphanages/:id', OrphansController.show);
routes.post('/orphanages', upload.array('images'), OrphansController.create);

export default routes;