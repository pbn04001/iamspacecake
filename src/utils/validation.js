const isEmpty = value => value === undefined || value === null || value === ''

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

export const Validation = {
  required: (value) => {
    let reqiredError
    if (isEmpty(value)) {
      reqiredError = 'Required'
    }
    return reqiredError
  },

  email: value => (!emailRegex.test(value) ? 'Invalid email address' : undefined),
}
