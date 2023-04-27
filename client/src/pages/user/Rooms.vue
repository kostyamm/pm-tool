<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

const store = useStore()
const roomName = ref(null)

const rooms = computed(() => store.getters['user/rooms'])
const guestRooms = computed(() => store.getters['user/guestRooms'])

const onCreateRoom = () => {
    store.dispatch('user/createRoom', { name: roomName.value })
    roomName.value = null
}

const onRemoveRoom = (id) => store.dispatch('user/removeRoom', id)

onMounted(async () => await store.dispatch('user/fetchRooms'))
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
                <el-button link @click="onRemoveRoom(row._id)" type="danger">Remove</el-button>
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
