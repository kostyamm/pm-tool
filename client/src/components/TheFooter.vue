<script setup>
import Logo from './common/Logo.vue'
</script>

<template>
    <el-row class="the-footer" justify="space-between" align="middle">
        <Logo text="PM Tool" />
        <el-text truncated>Copyright © 2022 - {{ new Date().getFullYear() }} PM Tool. All rights reserved.</el-text>
    </el-row>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.the-footer {
    height: var(--el-footer-height);
}
</style>