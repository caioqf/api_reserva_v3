import { Router } from 'express';
import HospedeController from '../controllers/hospede.controller';

const hospedeRouter = Router();
const hospedeController = new HospedeController();

hospedeRouter.get('/', hospedeController.getAll);
hospedeRouter.post('/', hospedeController.create);

export default hospedeRouter
