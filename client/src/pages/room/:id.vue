<script>
import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useSocket } from '../../hooks/useSocket.js'
import RoomTasks from '../../components/room/RoomTasks.vue'
import RoomVote from '../../components/room/RoomVote.vue'
import RoomChat from '../../components/room/RoomChat.vue'

export default {
    name: "Room",
    components: { RoomChat, RoomVote, RoomTasks },
    setup() {
        const store = useStore()
        const route = useRoute()
        const { emitVote, emitTask, emitSkipTask, emitMessage, socketDisconnect } = useSocket(route.params.id)

        const isOwner = computed(() => store.getters['room/isOwner'])
        const hasGuest = computed(() => store.getters['room/hasGuest'])
        const room = computed(() => store.getters['room/room'])

        onUnmounted(() => {
            socketDisconnect()
            store.commit('room/resetState')
        })

        onMounted(async () => {
            await store.dispatch('room/fetchRoomById', route.params.id)
            if (!room.value) {
                return
            }

            if (!isOwner.value && !hasGuest.value) {
                store.dispatch('room/addGuest', route.params.id)
            }
        })

        return {
            room,
            emitVote,
            emitTask,
            emitSkipTask,
            emitMessage
        }
    },
}
</script>

<template>
    <div v-if="room" class="room">
        <RoomTasks class="room__tasks" @addTask="emitTask" @skipTask="emitSkipTask" />

        <div class="room__content">
            <RoomVote @onVote="emitVote" />
            <RoomChat :emitMessage="emitMessage"/>
        </div>
    </div>
    <span v-else class="text-h2">Room is not found</span>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.room {
    display: flex;
    flex-wrap: wrap;

    & * {
        flex: 1;
    }

    &__tasks {
        max-width: 300px;
        padding-right: 12px;

        max-height: $content-height;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
    }

    &__content {
        padding-left: 12px;
    }
}
</style>