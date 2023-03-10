<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "RoomChatMessages",
    setup() {
        const store = useStore()

        const messageEl = ref()

        const user = computed(() => store.getters['user/user'])
        const messages = computed(() => store.getters['room/messages'])

        watch(() => messages,
            () => {
                setTimeout(() => {
                    if (!messageEl.value) {
                        return
                    }

                    const messages = messageEl.value
                    const lastIndex = messages.length - 1
                    messages[lastIndex]?.scrollIntoView({ behavior: "smooth" })
                })
            },
            { deep: true, immediate: true },
        )

        return {
            user,
            messages,
            messageEl,
        }
    },
}
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
@import '../../assets/styles/transitions.scss';
@import '../../assets/styles/variables-room.scss';

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
    height: $room-chat-messages-height;
    max-height: $room-chat-messages-height;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 16px;

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