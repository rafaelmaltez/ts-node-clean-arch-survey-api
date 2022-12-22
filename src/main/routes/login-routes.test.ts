import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import bcrypt from 'bcrypt'

let accountCollection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rafael',
          email: 'rafaelmaltez89@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login success', async () => {
      const password = await bcrypt.hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Rafael',
        email: 'rafaelmaltez89@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafaelmaltez89@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 if invalid credentials are provided', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafaelmaltez89@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
