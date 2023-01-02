import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSurveyController } from '../factories/controllers/survey/add-survey-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeSurveyController()))
}
