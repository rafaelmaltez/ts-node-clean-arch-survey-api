import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import DbAuthentication from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailStub = new LoadAccountByEmailStub()
    const sut = new DbAuthentication(loadAccountByEmailStub)
    const loadSpy = jest.spyOn(loadAccountByEmailStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
