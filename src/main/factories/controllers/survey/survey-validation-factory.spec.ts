import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeSurveyValidation } from './survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('LoginValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
