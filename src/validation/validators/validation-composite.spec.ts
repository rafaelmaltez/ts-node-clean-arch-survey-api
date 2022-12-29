import { ValidationComposite } from './validation-composite'
import { Validation } from '../../presentation/protocols'
import { MissingParamError } from '../../presentation/errors'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return the same error as validation if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('any_param'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('first_error'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const error = sut.validate({})
    expect(error).toEqual(new Error('first_error'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })
})
