export class ServerError extends Error {
  constructor (stack: string) {
    super('Error inesperado no servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
