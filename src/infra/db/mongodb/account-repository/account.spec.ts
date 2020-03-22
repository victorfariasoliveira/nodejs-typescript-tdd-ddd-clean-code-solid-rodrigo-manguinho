import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })
  afterAll(async () => { await MongoHelper.disconnect() })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Deve retornar um account caso dê sucesso', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'qualquer_nome',
      email: 'qualquer_email@gmail.com',
      password: 'qualquer_senha'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('qualquer_nome')
    expect(account.email).toBe('qualquer_email@gmail.com')
    expect(account.password).toBe('qualquer_senha')
  })
})
