import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Deve retornar um account caso dê sucesso', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Victor',
        email: 'victor@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
