<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../stores/UserStore.js'
import { storeToRefs } from 'pinia'

const UserStore = useUserStore()
const { rooms, guestRooms } = storeToRefs(UserStore)
const { createRoom, removeRoom, fetchRooms } = UserStore

const roomName = ref(null)

const onCreateRoom = () => {
    createRoom({ name: roomName.value })
    roomName.value = null
}

onMounted(async () => await fetchRooms())
</script>

<template>
    <h1 class="text-h2">Create room</h1>
    <el-input
        v-model="roomName"
        @keypress.enter="onCreateRoom"
        placeholder="Enter room name"
        size="large"
    >
        <template #append>
            <el-button @click="onCreateRoom" type="primary">Create</el-button>
        </template>
    </el-input>

    <h1 class="text-h2">Your rooms</h1>
    <el-table :data="rooms">
        <el-table-column prop="name" label="Name" width="250" show-overflow-tooltip />
        <el-table-column prop="_id" label="Link" show-overflow-tooltip>
            <template #default="{ row }">
                <el-button link @click="$router.push(`/room/${row._id}`)">
                    {{ row._id }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="Action" width="120">
            <template #default="{ row }">
                <el-button link @click="removeRoom(row._id)" type="danger">Remove</el-button>
            </template>
        </el-table-column>
    </el-table>

    <h1 class="text-h2">Guest's rooms</h1>
    <el-table :data="guestRooms">
        <el-table-column prop="name" label="Name" width="250" show-overflow-tooltip />
        <el-table-column prop="_id" label="Link" show-overflow-tooltip>
            <template #default="{ row }">
                <el-button link @click="$router.push(`/room/${row._id}`)">
                    {{ row._id }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
