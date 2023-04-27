<script setup>
import { ref } from 'vue'
import RoomChatBody from '../../components/room/RoomChatBody.vue'

const { isOpen, emitMessage } = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    emitMessage: {
        type: Function,
        required: true
    }
})

const emit = defineEmits(['update:is-open'])

const textEl = ref()
const message = ref('')

const handleClose = () => emit('update:is-open', false)

const sendMessage = () => {
    textEl.value.focus()

    emitMessage(message.value)

    message.value = ''
}
</script>

<template>
    <el-drawer v-model="isOpen" @closed="handleClose" close-on-press-escape size="60%">
        <RoomChatBody />

        <template #footer>
            <el-input
                ref="textEl"
                v-model="message"
                @keypress.enter="sendMessage"
                size="large"
                placeholder="Your message"
            >
                <template #append>
                    <el-button @click="sendMessage" :disabled="!message">Send</el-button>
                </template>
            </el-input>
        </template>
    </el-drawer>
</template>
