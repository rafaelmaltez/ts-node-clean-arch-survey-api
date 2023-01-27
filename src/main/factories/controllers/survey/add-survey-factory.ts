import { Controller } from '../../../../presentation/protocols/controller'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeSurveyValidation } from './survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/survey/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator-factory'

export const makeSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
