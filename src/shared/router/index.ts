import { Router } from 'express'
import hospedeRouter from '../../routes/hospede.routes';

const routes = Router();

routes.use('/hospede', hospedeRouter)

export default routes