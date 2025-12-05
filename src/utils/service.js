import axios from 'axios'
import _config from '@/config.js'
import mode from '@/mode.js'
import router from '@/router'
import alert from '@/utils/alert.js'
const alert2 = alert

const buildUri = (uri) => {
  // BypassUri
  if (uri.toString().includes('BypassUri')) {
    return uri.toString().replace('BypassUri', '')
  }

  return uri + '/list'
}

const logout = () => {
  // this.$router.push({ path: '/login' })
  localStorage.clear()
  window.location.replace('/login')
}

const sso = _config.options.sso ? axios.create({
  baseURL: _config.sso[mode],
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}) : null

const env = axios.create({
  baseURL: _config.server[mode],
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

const buffer = axios.create({
  baseURL: _config.server[mode],
  responseType: 'arraybuffer',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

env.interceptors.request.use(
  (config) => {
    let url_backend = localStorage.getItem('url_backend') || null
    if (url_backend) config.baseURL = url_backend
    else {
      config.baseURL = _config.server[mode]
      localStorage.setItem('url_backend', config.baseURL)
    }

    try {
      let token = JSON.parse(localStorage.getItem('_token')) || null
      if (token) {
        token = '' + token
        config.headers['token'] = `${token}`
      }
    } catch (error) {
      console.log('Token Error (service.js)')
      localStorage.removeItem('_token')
      router.push({ name: 'login' })
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

buffer.interceptors.request.use(
  (config) => {
    try {
      let url_backend = localStorage.getItem('url_backend') || null
      if (url_backend) config.baseURL = url_backend
      else {
        config.baseURL = _config.server[mode]
        localStorage.setItem('url_backend', config.baseURL)
      }
      
      let token = JSON.parse(localStorage.getItem('_token')) || null
      if (token) {
        token = '' + token
        config.headers['token'] = `${token}`
      }
    } catch (error) {
      console.log('Token Error (service.js)')
      localStorage.removeItem('_token')
      router.push({ name: 'login' })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const _service = {
  fetch(api) {
    return axios.get(api).then(response => {
      if (parseInt(response.data.status) !== 200) alert2.error({ message: response.data.message + ' - ' + endPoint })
      return response.data
    }).catch((err) => {
      throw err.response
    })
  },
  downloadFile(endPoint, param, filename) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return buffer.post(`${endPoint}`, { params: param, ...param }).then(response => {
      const type = response.headers['content-type']
      console.log('===> service.js:118 ~ response', response);

      let downloadFilename = filename
      if (!downloadFilename) {
        const contentDisposition = response.headers['content-disposition']
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
          if (filenameMatch && filenameMatch[1]) {
            downloadFilename = filenameMatch[1].replace(/['"]/g, '')
            // Decode if filename is URL encoded
            downloadFilename = decodeURIComponent(downloadFilename)
          }
        }
        
        // Fallback to generic filename if still undefined
        if (!downloadFilename) {
          const extension = type.includes('pdf') ? 'pdf' : type.includes('excel') ? 'xlsx' : type.includes('word') ? 'docx' : 'file'
          downloadFilename = `download_${Date.now()}.${extension}`
        }
      }

      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = downloadFilename
      link.click()
    }).catch((err) => {
      
      console.log('===> service.js:125 ~ ', );
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  uploadFile(endPoint, data, onUploadProgress) {
    return env.post(endPoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  signOut() {
    localStorage.clear()
    router.push({ name: 'login' })
  },
  sso(endPoint, data) {
    return sso.post(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  raw(method, endPoint, data) {
    return env[method](`${endPoint}`, data).then(response => {
      if (parseInt(response.data.status) !== 200) alert2.error({ message: response.data.message + ' - ' + endPoint })
      return response.data
    }).catch((err) => {
      throw err
    })
  },
  post(endPoint, data) {
    return env.post(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err && err.response && (err.response.status === 401 || err.response.status === 201)) this.signOut()
      else if (err && err.response) throw err.response
      else throw err
    })
  },
  put(endPoint, data) {
    return env.put(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  get(endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return env.get(`${endPoint}`, { params: param, ...param }).then(response => {
      // if (parseInt(response.data.status) !== 200) alert2.error({ message: response.data.message + ' - ' + endPoint })
      if (response.data.status !== 200) throw { response: response }
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  del(endPoint, data) {
    return env.delete(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  list(endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    let halaman = param.page
    let jumlah = param.limit

    return env.post(`${buildUri(endPoint)}`, { params: param, ...param, halaman, jumlah }).then(response => {
      if (parseInt(response.data.status) !== 200) alert2.error({ message: response.data.message + ' - ' + buildUri(endPoint) })
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  dataset(endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    let halaman = param.page
    let jumlah = param.limit

    return env.post(`${buildUri(endPoint)}`, { params: param, ...param, halaman, jumlah }).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  single(endPoint, param, id) {
    // if (param) endPoint += '?' + param
    // return env.get(`${endPoint}` + '/' + id + '/show').then(response => {
    return env.post(`${endPoint}` + `/detailsById`, { id }).then(response => {
      // return env.get(`${endPoint}` + `/detailsById/${id}`, {id}).then(response => {
      if (parseInt(response.data.status) !== 200) alert2.error({ message: response.data.message + ' - ' + endPoint })
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  create(endPoint, data) {
    if (data) delete data.id
    return env.post(`${endPoint}` + '/register', data).then(response => {
      if (response.data.status !== 200) throw { response: response }
      return response.data
    }).catch((err) => {
      let status = 0
      if (err && err.response && err.response.data && err.response.data.status) status = err.response.data.status
      if (status === 401 || status === 201) this.signOut()
      else throw err.response
    })
  },
  customCreate(endPoint, data) {
    return env.post(`${endPoint}`, data).then(response => {
      if (response.data.status !== 200) throw { response: response }
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  update(endPoint, data) {
    return env.post(`${endPoint}` + '/update', data).then(response => {
      if (response.data.status !== 200) throw { response: response }
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  delete(endPoint, data) {
    return env.post(`${endPoint}` + '/delete', data).then(response => {
      if (response.data.status !== 200) throw { response: response }
      return response.data
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 201) this.signOut()
      else throw err.response
    })
  },
  progress(method, endPoint, param, onUploadProgress) {
    return env[method](endPoint, param, {
      onUploadProgress
    })
  },
  fileUpload(file, onUploadProgress) {
    let formData = new FormData()
    formData.append('file', file)
    return env.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }
}

export default _service
