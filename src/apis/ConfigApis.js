import axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'

axios.defaults.socketUrl = document.baseURI
axios.defaults.baseURL = axios.defaults.socketUrl + '/api'

loadProgressBar()

export default {
  getSocketIP () { return axios.defaults.socketUrl },
  getSocketPath () {
    const innerPath = document.baseURI.split('/').splice(3).join('/')
    return `/${innerPath}/socket.io`.replace('//', '/')
  },
  getConfig () {
    return axios.get('/settings')
      .then(response => {
        return response.data
      })
  },
  updateConfig (data) {
    return axios.post('/settings', data)
      .then(response => {
        return response.data
      })
  },
  exportConfig () {
    return axios.get('/exportConfig')
      .then(response => {
        return response.data
      })
  },
  importConfig (data) {
    return axios.post('/importConfig', data)
      .then(response => {
        return response.data
      })
  }
}
