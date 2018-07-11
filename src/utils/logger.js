export const logError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error) // eslint-disable-line no-console
  }
}

const Logger = {
  logError,
}

export default Logger
