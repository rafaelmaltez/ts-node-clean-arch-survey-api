import { bodyParser } from '../middlewares/body-parser'

export default (app): void => {
  app.use(bodyParser)
}
