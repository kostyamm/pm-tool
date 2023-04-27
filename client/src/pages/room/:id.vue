<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useSocket } from '../../hooks/useSocket.js'
import RoomVote from '../../components/room/RoomVote.vue'
import RoomAside from '../../components/room/RoomAside.vue'
import RoomTasks from '../../components/room/RoomTasks.vue'

const store = useStore()
const route = useRoute()
const { emitVote, emitTask, emitSkipTask, emitMessage, disconnectSocket } = useSocket(route.params.id)

const isOwner = computed(() => store.getters['room/isOwner'])
const hasGuest = computed(() => store.getters['room/hasGuest'])
const room = computed(() => store.getters['room/room'])

onMounted(async () => {
    await store.dispatch('room/fetchRoomById', route.params.id)

    if (!room.value) {
        return
    }

    if (!isOwner.value && !hasGuest.value) {
        store.dispatch('room/addGuest', route.params.id)
    }
})

onUnmounted(() => {
    disconnectSocket()
    store.commit('room/resetState')
})
</script>

<template>
    <el-row v-if="room" :gutter="32">
        <el-col :span="18">
            <RoomVote @onVote="emitVote" />
            <RoomTasks @addTask="emitTask" @skipTask="emitSkipTask" />
        </el-col>

        <el-col :span="6">
            <RoomAside :emitMessage="emitMessage" />
        </el-col>
    </el-row>
    <el-empty v-else class="text-h2">Room is not found</el-empty>
</template>
