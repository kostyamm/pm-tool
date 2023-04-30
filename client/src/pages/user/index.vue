<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/UserStore.js'

const { user } = storeToRefs(useUserStore())
</script>

<template>
    <el-descriptions
        v-if="user"
        :title="user.name"
        :column="1"
        border
    >
        <el-descriptions-item label="ID">{{ user.id }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{ user.email }}</el-descriptions-item>
    </el-descriptions>
</template>
