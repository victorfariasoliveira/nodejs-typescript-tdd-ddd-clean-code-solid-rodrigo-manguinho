import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o name não for informado', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'qualquer_nome',
        email: 'qualquer_email@email.com',
        password: '112233',
        passwordConfirmation: '112233'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
