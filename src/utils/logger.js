export const logError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }
}

const Logger = {
  logError,
}

export default Logger
