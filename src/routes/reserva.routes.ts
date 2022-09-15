import { Router } from 'express';
import ReservaController from '../controllers/reserva.controller';

const reservaRouter = Router();
const reservaController = new ReservaController();

reservaRouter.get('/', reservaController.getAll);
reservaRouter.get('/:id', reservaController.getOne);
reservaRouter.post('/', reservaController.create);
reservaRouter.post('/:idReserva/hospede/:idHospede', reservaController.checkIn);

export default reservaRouter
