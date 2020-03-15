export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Falta de parametro: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
