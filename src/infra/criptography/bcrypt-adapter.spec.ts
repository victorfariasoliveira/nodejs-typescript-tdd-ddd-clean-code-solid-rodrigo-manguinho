import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adaper'

describe('Bcrypt Adapter', () => {
  test('Deve chamar o bcrypt com valores corretos', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
