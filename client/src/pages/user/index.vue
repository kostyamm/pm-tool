<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters['user/user'])
</script>

<template>
    <el-descriptions
        :title="user.name"
        :column="1"
        border
    >
        <el-descriptions-item label="ID">{{ user.id }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{ user.email }}</el-descriptions-item>
    </el-descriptions>
</template>
