import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('Caso seja retornado falso o validador deve retornar falso', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})
