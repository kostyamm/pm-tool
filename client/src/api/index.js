import axios from 'axios'
import Cookies from 'js-cookie'

const AXIOS_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL,
}

const API = axios.create(AXIOS_CONFIG)

const tokenInterceptor = config => {
    const token = Cookies.get('token')

    if (token) {
        config.headers.authorization = `${token}`
    }

    return config
}
const responseSuccessInterceptor = (response) => ({ data: response.data })
const networkErrorInterceptor = (error) => {
    if (error.response) {
        const { data, statusText, status } = error.response

        return {
            error: {
                title: statusText,
                message: data?.message || error.message,
                status
            },
        }
    }
    return { error };
};

API.interceptors.request.use(tokenInterceptor)
API.interceptors.response.use(
    responseSuccessInterceptor,
    networkErrorInterceptor,
);

export default API