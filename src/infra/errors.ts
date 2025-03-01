export class InternalServerError extends Error {
  private action: string
  private statusCode: number

  constructor({ cause, statusCode }: ErrorOptions & { statusCode?: number }) {
    super('Um erro interno não esperado aconteceu', {
      cause
    })
    this.name = this.constructor.name
    this.action = 'Entre em contato com o suporte.'
    this.statusCode = statusCode || 500
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    }
  }
}
