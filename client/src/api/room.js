import API from './index'
import { useNotice } from '../hooks/useNotice.js'

const { errorNotice } = useNotice()

export const getRoomById = async (id) => {
    const { data, error } = await API.get(`/room/${id}`)

    return error ? errorNotice(error) : data
}

export const addRoomGuest = async (id) => {
    const { data, error } = await API.post(`/room/${id}`)

    return error ? errorNotice(error) : data
}