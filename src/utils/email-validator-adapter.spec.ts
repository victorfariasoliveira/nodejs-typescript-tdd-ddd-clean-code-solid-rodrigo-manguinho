import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({ isEmail():boolean {return true}}))

describe('EmailValidator Adapter', () => {
  test('Caso seja retornado falso o validador deve retornar falso', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})

describe('EmailValidator Adapter', () => {
  test('Caso seja retornado verdadeiro o validador deve retornar verdadeiro', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@gmail.com')
    expect(isValid).toBe(true)
  })
})
