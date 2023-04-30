<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '../../stores/RoomStore.js'

const emit = defineEmits(['onVote'])

const VOTE_VALUES = [0.5, 1, 2, 3, 5, 7]
const { tasks } = storeToRefs(useRoomStore())

const vote = ref(null)

const isEndVoting = computed(() => tasks.value.every(({ vote }) => vote))
const isEmptyTasks = computed(() => !tasks.value.length)
const currentTask = computed(() => tasks.value.find(({ active }) => active))

watch(() => currentTask.value, (value, oldValue) => {
    if (value?.url === oldValue?.url) {
        return
    }

    vote.value = null
}, { deep: true })

const onVote = (value) => {
    vote.value = value
    emit('onVote', value)
}
</script>

<template>
    <h2 v-if="!isEmptyTasks && !isEndVoting" class="text-h2">Estimate in days</h2>
    <h2 v-else-if="isEmptyTasks" class="text-h2">Task list is empty</h2>
    <h2 v-else class="text-h2">Estimation completed</h2>

    <el-row v-if="!isEmptyTasks && !isEndVoting" :gutter="12">
        <el-col
            v-for="item in VOTE_VALUES"
            :key="item"
            :span="24 / VOTE_VALUES.length"
        >
            <el-button
                @click="onVote(item)"
                :type="vote === item ? 'success' : 'info'"
            >
                {{ item }}
            </el-button>
        </el-col>
    </el-row>
    <el-divider />
</template>

<style lang="scss" scoped>
h2 {
    text-align: center;
}

.el-button {
    width: 100%;
    height: 100px;
    margin-top: 12px;
}
</style>