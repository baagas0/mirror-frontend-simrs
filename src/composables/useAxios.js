
import axios from "axios";
import { ipBackend } from "@/ipBackend";

// Create axios instance
const axiosInstance = axios.create();

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 401) {
            // Redirect to login page
            localStorage.clear()
            window.location.replace('/login')
        }
        return Promise.reject(error);
    }
);

export async function useGetAxios(url, param = {}) {
    let res = null
    let err = null

    let paramDefault = {
        halaman: 1,
        jumlah: 9999999
    }

    try {
        console.log(ipBackend + url);
        let req = await axiosInstance.post(ipBackend + url, { ...param, ...paramDefault })
        if (req.data.status === 200 && req.data.message === 'sukses') res = req.data.data
        else throw req.data
    } catch (error) {
        console.log('errrrrrrrrrrrrorrrrrrrrrrrrrrrrrrr', error)
        if (error.message) err = error.message
        else err = error
    }

    const response = {
        res: res,
        err: err
    };
    if (!response.res) response.res = { message: err }
    return response;
}