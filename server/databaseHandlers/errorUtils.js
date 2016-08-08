// Logs the error on the relevant level
export function logError (error) {
  error.statusCode === 400 ? console.info(error) : console.error(error)
}
