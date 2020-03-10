export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Falta de parametro: Nome')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Falta de parametro: Email')
      }
    }
  }
}
