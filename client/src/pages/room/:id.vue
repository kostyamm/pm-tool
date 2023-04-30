<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSocket } from '../../hooks/useSocket.js'
import { useRoomStore } from '../../stores/RoomStore.js'
import { storeToRefs } from 'pinia'
import RoomVote from '../../components/room/RoomVote.vue'
import RoomAside from '../../components/room/RoomAside.vue'
import RoomTasks from '../../components/room/RoomTasks.vue'

const RoomStore = useRoomStore()
const { isOwner, hasGuest, room } = storeToRefs(useRoomStore())
const { fetchRoomById, addGuest } = RoomStore

const { params } = useRoute()
const paramsId = params.id

const { emitVote, emitTask, emitSkipTask, emitMessage, disconnectSocket } = useSocket(paramsId)

onMounted(async () => {
    await fetchRoomById(paramsId)

    if (!room.value) {
        return
    }

    if (!isOwner.value && !hasGuest.value) {
        addGuest(paramsId)
    }
})

onUnmounted(() => {
    disconnectSocket()
    RoomStore.$reset()
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
