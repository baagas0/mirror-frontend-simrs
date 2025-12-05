import { isArray } from 'lodash'
import Vue from 'vue'

const _alert = {
  error(err, title = null, text = null, timer = 4000) {
    if (err.status === undefined && title === null && text === null && typeof err !== 'string') return
    
    const message = err.data ? err.data.message : err.message

    if (err.status !== 200 && err.message) {
      return Vue.swal({
        position: 'center',
        icon: 'error',
        title: title || 'Error',
        text: text || message,
        toast: false,
        timer: timer,
        showConfirmButton: false
      })
    }

    return Vue.swal({
      position: 'center',
      icon: 'error',
      title: title || 'Error',
      text: typeof err !== 'string' ? text || message : err,
      toast: false,
      timer: 3000,
      showConfirmButton: false
    })
  },
  success(title = null, text = null) {
    return Vue.swal({
      position: 'top-right',
      icon: 'success',
      title: title || text,
      // text: text,
      toast: true,
      timer: 3000,
      showConfirmButton: false
    })
  },
  confirm(title = null, text = null, agree = null, disagree = null, icon = null) {
    return Vue.swal({
      title: title,
      text: text,
      icon: icon || 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#868e96',
      confirmButtonText: agree || 'Ya, Lanjutkan',
      cancelButtonText: disagree || 'Batalkan'
    })
  },
  custom(title = null, text = null, icon = 'success', timer = 3000, showConfirmButton = false, toast = true, position = 'center') {
    return Vue.swal({
      position: position,
      icon: icon,
      title: title,
      text: text,
      toast: toast,
      timer: timer,
      showConfirmButton: showConfirmButton
    })
  }
}

export default _alert
