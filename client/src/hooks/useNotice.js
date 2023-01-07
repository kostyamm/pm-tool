import store from '../store/index.js'

export const useNotice = () => {
    const baseNotice = (data, status) => {
        store.dispatch('createNotice', { ...data, id: Date.now(), status })
    }

    const successNotice = data => baseNotice(data, 'success')
    const errorNotice = data => baseNotice(data, 'error')

    return {
        errorNotice,
        successNotice,
    }
}
