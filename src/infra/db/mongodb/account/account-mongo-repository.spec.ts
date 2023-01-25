import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/clean-survey-api')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.name).toBe('any_name')
      expect(account.name).toBe('any_name')
    })

    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.name).toBe('any_name')
      expect(account.name).toBe('any_name')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return null if loadByEmail finds no account', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email')
      expect(account).toBeFalsy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should update access token on updateAccessToken success', async () => {
      const sut = makeSut()
      const accountData = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      const res = await accountCollection.findOne({ _id: accountData.insertedId })
      expect(res.accessToken).toBeFalsy()
      await sut.updateAccessToken(accountData.insertedId, 'any_token')
      const updatedAccountData = await accountCollection.findOne({ _id: accountData.insertedId })
      expect(updatedAccountData.accessToken).toBe('any_token')
    })
  })
})
