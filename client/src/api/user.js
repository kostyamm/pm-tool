import API from './index'
import jwtDecode from 'jwt-decode'
import { useNotice } from '../hooks/useNotice.js'
import Cookies from 'js-cookie'

const { errorNotice } = useNotice()

// User
const calcDays = (val) => Math.floor(val / (3600 * 24))
const calcExpires = ({ exp, iat }) => calcDays(exp) - calcDays(iat)
const processingResponse = ({ data, error }) => {
    if (error) {
        return errorNotice(error)
    }

    const decoded = jwtDecode(data.token)

    Cookies.set('token', data.token, { expires: calcExpires(decoded) })

    return { token: data.token, ...decoded }
}

export const registration = async (userData) => {
    const response = await API.post('/user/registration', userData)

    return processingResponse(response)
}

export const login = async (userData) => {
    const response = await API.post('/user/login', userData)

    return processingResponse(response)
}

export const auth = async () => {
    const response = await API.get('/user/auth')

    return processingResponse(response)
}

// User rooms
export const fetchUserRooms = async () => {
    const { data, error } = await API.get('/user/rooms')

    return error ? errorNotice(error) : data
}

export const createUserRoom = async (room) => {
    const { data, error } = await API.post('/user/rooms', room)

    return error ? errorNotice(error) : data?.room
}

export const removeUserRoom = async (id) => {
    const { data, error } = await API.delete(`/user/rooms/${id}`)

    return error ? errorNotice(error) : data?.room._id
}