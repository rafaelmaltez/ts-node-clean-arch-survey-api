import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'
import { MissingParamError } from '../../errors'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('ValidationComposite', () => {
  test('Should return the same error as validation if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('any_param'))
  })
})
