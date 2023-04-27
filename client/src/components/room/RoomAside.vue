<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RoomChat from '../../components/room/RoomChat.vue'

const { emitMessage } = defineProps({
    emitMessage: {
        type: Function,
        required: true
    }
})

const store = useStore()

const isOpen = ref(false)

const roomUsers = computed(() => store.getters['room/users'])
const roomName = computed(() => store.getters['room/room'].name)
</script>

<template>
    <RoomChat v-model:is-open="isOpen" :emitMessage="emitMessage" />

    <el-row>
        <el-col>
            <el-text truncated>
                <h2 class="text-h4">Room name: {{ roomName }}</h2>
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
        <el-col v-for="user of roomUsers" :key="user.userId">
            <el-text truncated class="text-p">
                {{ user.userName }} {{ user.vote && `[${user.vote}]` }}
            </el-text>
        </el-col>
    </el-row>
</template>
