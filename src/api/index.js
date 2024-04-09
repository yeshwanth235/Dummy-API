import Axios from 'axios'

const commonService = {
  getDataViaApi (path, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'application/json'
    }
    Axios.get(path, {headers: headerObject}).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  postDataViaApi (path, data, cb, errorHandler) {
    Axios.post(path, data).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  putDataViaApi (path, data, cb, errorHandler) {
    Axios.put(path, data).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  deleteDataViaApi (path, data, cb, errorHandler) {
    Axios.delete(path, data).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  postFileDataViaApi (path, formData, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'multipart/form-data'
    }
    Axios.post(path, formData, {headers: headerObject}).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  postPlainDataViaApi (path, data, cb, errorHandler) {
    let headerObject = {
      'Content-Type': 'text/plain'
    }
    Axios.post(path, data, {headers: headerObject}).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  },
  patchDataViaApi (path, data, cb, errorHandler) {
    Axios.patch(path, data).then((res) => {
      cb(res)
    }, (error) => {
      errorHandler(error)
    })
  }
}

export default commonService
