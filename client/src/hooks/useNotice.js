import { ElNotification } from 'element-plus'

export const useNotice = () => {
    const successNotice = data => ElNotification({ type: 'success', ...data })
    const errorNotice = data => ElNotification({ type: 'error', ...data })

    return {
        errorNotice,
        successNotice,
    }
}
