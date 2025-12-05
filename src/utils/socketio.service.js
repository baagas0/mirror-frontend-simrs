import { io } from 'socket.io-client'
import _config from '@/config.js'
import mode from '@/mode.js'
// import store from '@/store/store'
// import { ipBackend } from '../ipBackend';

let url_backend = localStorage.getItem('url_backend') || null
if (!url_backend) {
  url_backend = _config.server[mode]
  localStorage.setItem('url_backend', url_backend)
}
console.log(`Socket connect to: ${url_backend}`)
const socketss = io(url_backend, {
  transports: ['websocket']
  // extraHeaders: {
  //   token : store.state.login_token
  // }
})
// class SocketioService {
//   socket;
//   constructor() {}

//   setupSocketConnection() {
//     this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
//     this.socket.on("refresh", (data) => {
//       console.log(data, "wadefak mannnnn");
//     });
//   }
//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }
//   panggil(asd) {
//     this.socket.emit("panggil", asd);
//   }
//   // refresh() {
//   //   this.socket.on("refresh", (data) => {
//   //     console.log(data, "uhuy");
//   //   });
//   // }
// }

export default socketss;
