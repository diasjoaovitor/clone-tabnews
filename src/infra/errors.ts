export type ErrorResponse = {
  name: string
  message: string
  action: string
  status_code: number
}

type AppErrorOptions = ErrorOptions & {
  message?: string
  action?: string
}

// `message` and `action` reach the user as they are (API body or form message), so they're written
// in pt-BR
export abstract class AppError extends Error {
  public action: string
  public statusCode: number

  constructor({
    cause,
    message,
    action,
    statusCode
  }: {
    cause?: unknown
    message: string
    action: string
    statusCode: number
  }) {
    super(message, { cause })
    this.action = action
    this.statusCode = statusCode
  }

  toJSON(): ErrorResponse {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    }
  }
}

export class InternalServerError extends AppError {
  constructor({ cause, statusCode }: ErrorOptions & { statusCode?: number }) {
    super({
      cause,
      message: 'Um erro interno não esperado aconteceu',
      action: 'Entre em contato com o suporte.',
      statusCode: statusCode || 500
    })
    this.name = 'InternalServerError'
  }
}

export class ServiceError extends AppError {
  public context?: unknown

  constructor({
    cause,
    message,
    action,
    context
  }: AppErrorOptions & { context?: unknown }) {
    super({
      cause,
      message: message || 'Serviço indisponível no momento.',
      action: action || 'Verifique se o serviço está disponível.',
      statusCode: 503
    })
    this.name = 'ServiceError'
    this.context = context
  }
}

export class MethodNotAllowedError extends AppError {
  constructor() {
    super({
      message: 'Método não permitido para este endpoint.',
      action: 'Verifique se o método HTTP enviado é válido para este endpoint.',
      statusCode: 405
    })
    this.name = 'MethodNotAllowedError'
  }
}

export class ValidationError extends AppError {
  constructor({
    cause,
    message,
    action,
    statusCode
  }: AppErrorOptions & { statusCode?: number } = {}) {
    super({
      cause,
      message: message || 'Um erro de validação ocorreu.',
      action: action || 'Ajuste os dados enviados e tente novamente.',
      statusCode: statusCode || 400
    })
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor({ cause, message, action }: AppErrorOptions = {}) {
    super({
      cause,
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      action:
        action ||
        'Verifique se os parâmetros enviados na consulta estão certos.',
      statusCode: 404
    })
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor({ cause, message, action }: AppErrorOptions = {}) {
    super({
      cause,
      message: message || 'Usuário não autenticado.',
      action: action || 'Faça novamente o login para continuar.',
      statusCode: 401
    })
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor({ cause, message, action }: AppErrorOptions = {}) {
    super({
      cause,
      message: message || 'Acesso negado.',
      action: action || 'Verifique as features necessárias antes de continuar.',
      statusCode: 403
    })
    this.name = 'ForbiddenError'
  }
}
