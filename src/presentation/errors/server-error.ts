export class ServerError extends Error {
  constructor () {
    super('Error inesperado no servidor')
    this.name = 'ServerError'
  }
}
