export class UserEmailExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}
