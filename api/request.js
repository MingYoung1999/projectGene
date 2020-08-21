import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  url: "https://geneherokudb.herokuapp.com/",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 8000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (response.status === 50008 || response.code === 50012 || response.code === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service