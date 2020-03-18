import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({ isEmail (): boolean { return true } }))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Caso seja retornado falso o validador deve retornar falso', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})

describe('EmailValidator Adapter', () => {
  test('Caso seja retornado verdadeiro o validador deve retornar verdadeiro', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@gmail.com')
    expect(isValid).toBe(true)
  })
})

describe('EmailValidator Adapter', () => {
  test('Deve chamar o validador com o valor de email correto', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@gmail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })
})
