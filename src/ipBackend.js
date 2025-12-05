// export const ipBackend = "http://localhost:8071/";
const ls = localStorage.getItem('url_backend') || ''
export const ipBackend = ls ? (ls + '') : ''
