// actions
export const actions = {

  // store register
  storeRegister({
    commit
  }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/customers/register" with method "POST"
      this.$axios.post('/api/customer/register', payload)

        // success
        .then(() => {

          // resolve promise
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}
