import { LogControllerDecorator } from './log'
import { HttpRequest, Controller, HttpResponse } from '../../presentation/protocols'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          email: 'qualquer_email@gmail.com',
          name: 'qualquer_nome',
          password: 'qualquer_senha',
          passwordConfirmation: 'qualquer_senha'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  const { sut, controllerStub } = makeSut()
  const handleSpy = jest.spyOn(controllerStub, 'handle')
  test('Deve chamar o método handle do controller', async () => {
    const httpRequest: HttpRequest = {
      body: {
        email: 'qualquer_email@gmail.com',
        name: 'qualquer_nome',
        password: 'qualquer_senha',
        passwordConfirmation: 'qualquer_senha'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
