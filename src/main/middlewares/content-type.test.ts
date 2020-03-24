import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Deve retornar o conteudo com padrão JSON', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Deve retornar o conteudo xml quando o tipo for forçado como xml', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
