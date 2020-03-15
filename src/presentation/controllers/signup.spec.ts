import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  } // ¹

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o name não for informado', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'qualquer_email@email.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o email não for informado', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o password não for informado', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se a confirmação de password não for informado', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o email enviado for inválido', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'email_invalido@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Deve chamar o EmailValidator com o email correto', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('qualquer_email@gmail.com')
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 500 se o EmailValidator retornar uma excessão', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

// ¹ => Stub é um tipo de Mock
