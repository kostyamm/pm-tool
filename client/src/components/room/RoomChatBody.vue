<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '../../stores/UserStore.js'
import { useRoomStore } from '../../stores/RoomStore.js'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
const { messages } = storeToRefs(useRoomStore())

const messageEl = ref()

watch(() => messages, () => {
    setTimeout(() => {
        if (!messageEl.value) {
            return
        }

        const messagesBlock = messageEl.value
        const lastIndex = messagesBlock.length - 1
        messagesBlock[lastIndex]?.scrollIntoView({ behavior: "smooth" })
    })
}, { deep: true, immediate: true })
</script>

<template>
    <div class="messages">
        <transition-group name="list">
            <div
                ref="messageEl"
                v-for="message in messages"
                :key="message.id"
            >
                <div v-if='message.userName === "server"' class='messages__item-server'>
                    {{ message.message }}
                </div>
                <div v-else :class="[user.id === message.userId? 'messages__item-owner' : 'messages__item']">
                    <div class="text-h6">{{ message.userName }}</div>
                    <p class="text-p">{{ message.message }}</p>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/variables.scss';

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.base-message {
    min-width: 160px;
    max-width: 320px;
    padding: 8px 12px;
    margin-bottom: 12px;
    border-radius: $border-radius;

    .text-h6 {
        border-bottom: 1px solid $grey-b;
    }

    .text-p {
        margin-top: 8px;

        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.messages {
    border-radius: $border-radius;
    padding: 0 16px;
    margin-bottom: 12px;

    &__item {
        @extend .base-message;

        background-color: $grey-a;
    }

    &__item-server {
        margin: 12px 0;

        &:before {
            margin-right: 4px;
            content: 'Server:';
            color: $grey-b;
        }
    }

    &__item-owner {
        @extend .base-message;

        background-color: $grey;
        margin-left: auto;

        & .text-p, .text-h6 {
            color: $dark;
        }

        & .text-h6 {
            border-bottom: 1px solid $grey-c;
        }
    }
}
</style>