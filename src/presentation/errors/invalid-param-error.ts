export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Parametro inválido: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
