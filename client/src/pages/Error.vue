<template>
    <el-empty class="error" description="404">
        <h1 class="text-h1">Page Not Found</h1>
        <el-button @click="$router.push('/')" type="primary" size="large">Back to homepage</el-button>
    </el-empty>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.error {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: $content-height;
}
</style>