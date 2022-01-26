import router from './router'
import throttle from './throttle'
import debounce from './debounce'
import formatTime from './formatTime'
import fetch from "./fetch"
import uploadFile from './uploadFile'
import wxAuth from './auth'

module.exports = {
  formatTime,
  fetch,
  uploadFile,
  router,
  throttle,
  debounce,
  wxAuth
}