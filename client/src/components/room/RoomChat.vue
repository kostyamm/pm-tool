<script>
import { ref } from 'vue'
import RoomChatMessages from '../../components/room/RoomChatMessages.vue'
import Field from '../../components/UI/Field.vue'
import { useNotice } from '../../hooks/useNotice.js'

export default {
    name: "RoomChat",
    components: { Field, RoomChatMessages },
    props: {
        emitMessage: {
            type: Function,
            required: true
        },
    },
    setup({ emitMessage }) {
        const message = ref('')
        const textEl = ref()
        const { errorNotice } = useNotice()

        const sendMessage = () => {
            textEl.value.childRef.focus()

            if (!message.value) {
                return errorNotice({ message: 'Message cannot be empty' })
            }

            emitMessage(message.value)

            message.value = ''
        }

        return {
            textEl,
            message,
            sendMessage,
        }
    },
}
</script>

<template>
    <RoomChatMessages />
    <div class="chat__footer">
        <Field ref="textEl" v-model="message" placeholder="Your message text..." @keypress.enter="sendMessage" />
        <button @click="sendMessage" class="button-large button-icon-right outline">
            Send
            <mdi-send />
        </button>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/variables-room';

.chat__footer {
    display: flex;
    padding: 12px 0;
    max-height: $room-chat-footer-height;

    .input-group {
        width: 100%;

        :deep(input) {
            border-radius: $border-radius 0 0 $border-radius;
        }
    }

    button:last-child {
        border-radius: 0 $border-radius $border-radius 0;

        &:after {
            border-radius: 0 $border-radius $border-radius 0;
        }
    }
}
</style>