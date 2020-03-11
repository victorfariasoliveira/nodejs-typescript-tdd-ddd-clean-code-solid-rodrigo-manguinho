import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('Nome'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('Email'))
    }
  }
}
