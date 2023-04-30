<script setup>
import { ref, computed } from 'vue'
import { useRoomStore } from '../../stores/RoomStore.js'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['addTask', 'skipTask'])

const { isOwner, tasks, users } = storeToRefs(useRoomStore())

const task = ref(null)

const addTask = () => {
    emit('addTask', task.value)
    task.value = null
}

const openTask = (url) => window.open(url, '_blank')

const skipTask = () => emit('skipTask')

const isVoted = computed(() => users.value.every(({ vote }) => vote))
</script>

<template>
    <template v-if="isOwner">
        <el-input v-model="task" @keypress.enter="addTask" placeholder="Task" size="large">
            <template #append>
                <el-button :disabled="!task" @click="addTask">Add</el-button>
            </template>
        </el-input>

        <el-button size="large" :disabled="!isVoted" @click="skipTask" type="danger">
            Skip active task
        </el-button>
    </template>

    <el-table :data="tasks">
        <el-table-column prop="active" label="Active" width="80">
            <template #default="{ row }">
                {{ row.active ? 'Active' : '' }}
            </template>
        </el-table-column>

        <el-table-column prop="url" label="Task" show-overflow-tooltip>
            <template #default="{ row }">
                <el-link @click="openTask(row.url)">
                    <el-text :type="row.active ? 'primary' : 'info'" truncated>
                        {{ row.url }}
                    </el-text>
                </el-link>
            </template>
        </el-table-column>

        <el-table-column label="Estimation" width="120">
            <template #default="{ row }">
                {{ row.vote ? `${row.vote}` : '---' }}
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
.el-input {
    margin-bottom: 24px;
}

.el-table {
    margin-top: 24px;
}
</style>
