export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credentials is not valid')
  }
}
