import { Router } from 'express'
import hospedeRouter from '../../routes/hospede.routes';
import reservaRouter from '../../routes/reserva.routes';

const routes = Router();

routes.use('/hospede', hospedeRouter)
routes.use('/reserva', reservaRouter)

export default routes