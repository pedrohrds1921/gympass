export class LimitTimeValidateError extends Error {
  constructor() {
    super('the checkIn validation time has expired')
  }
}
