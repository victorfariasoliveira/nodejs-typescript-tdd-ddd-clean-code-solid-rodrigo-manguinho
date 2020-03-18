import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, AccountModel, AddAccountModel, AddAccount } from './signup-protocols'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  } // ¹

  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'id_valido',
        name: 'nome_valido',
        email: 'email_valido@gmail.com',
        password: 'senha_valida'
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o name não for informado', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'qualquer_email@email.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o email não for informado', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o password não for informado', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se a confirmação de password não for informado', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o email enviado for inválido', async () => {
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
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Deve chamar o EmailValidator com o email correto', async () => {
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
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('qualquer_email@gmail.com')
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 400 se a confirmação de password falhar', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 500 se o EmailValidator retornar uma excessão', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 500 se o AddAccount falhar', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

describe('SignUp Controller', () => {
  test('Deve chamar o EmailValidator com o email correto', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@gmail.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'qualquer_nome',
      email: 'qualquer_email@gmail.com',
      password: '112233'
    })
  })
})

describe('SignUp Controller', () => {
  test('Deve retornar 200 se os dados passados foram válidos', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'nome_valido',
        email: 'email_valido@gmail.com',
        password: 'senha_valida',
        passwordConfirmation: 'senha_valida'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'id_valido',
      name: 'nome_valido',
      email: 'email_valido@gmail.com',
      password: 'senha_valida'
    })
  })
})
