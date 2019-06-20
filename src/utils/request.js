import axios from 'axios'
let baseUrl = 'https://mobiletest.derucci.net/consumer-admin/api/sales/v1'

class Request {
  getData ({ url, params, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        params: params,
        method: method
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Request
