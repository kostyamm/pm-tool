<script setup>
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
    <el-container>
        <el-header height="59px">
            <TheHeader/>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
        <el-footer>
            <TheFooter />
        </el-footer>
    </el-container>
</template>

<style lang="scss" scoped>
@import "./assets/styles/variables.scss";

.el-page-header, .el-main, .el-footer {
    width: 100%;
    max-width: $max-width;
    margin: 0 auto;
}

.el-header {
    border-bottom: 1px solid var(--el-border-color-light);
}

.el-main {
    min-height: calc(100vh - $header-height);
}
</style>

