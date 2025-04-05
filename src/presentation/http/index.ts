import  {Router} from 'express'
import { ExtractInvoicesController } from '../controllers/ExtractInvoicesController'
import { container } from '../../container'

const AppRouter = Router()

const controller = container.resolve(ExtractInvoicesController)

AppRouter.get('/hello', (req, res) => {
  res.send('Hello World')
})

AppRouter.post('/extract', (req, res, next) => {
  controller.handle(req, res).then(undefined, next);
})

export default AppRouter
