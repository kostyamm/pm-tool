<script setup>
import { ref } from 'vue'
import RoomChat from '../../components/room/RoomChat.vue'
import { useRoomStore } from '../../stores/RoomStore.js'
import { storeToRefs } from 'pinia'

const { emitMessage } = defineProps({
    emitMessage: {
        type: Function,
        required: true
    }
})

const { users, room } = storeToRefs(useRoomStore())

const isOpen = ref(false)
</script>

<template>
    <RoomChat v-model:is-open="isOpen" :emitMessage="emitMessage" />

    <el-row>
        <el-col>
            <el-text truncated>
                <h2 class="text-h4">Room name: {{ room.name }}</h2>
            </el-text>
        </el-col>

        <el-col>
            <el-button @click="isOpen = !isOpen" type="primary">Room chat</el-button>
        </el-col>
    </el-row>

    <el-row>
        <el-col>
            <h2 class="text-h4">User connected:</h2>
        </el-col>
        <el-col v-for="user of users" :key="user.userId">
            <el-text truncated class="text-p">
                {{ user.userName }} {{ user.vote && `[${user.vote}]` }}
            </el-text>
        </el-col>
    </el-row>
</template>
