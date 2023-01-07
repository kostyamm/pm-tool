<template>
    <div class="error">
        <h1 class="text-h1">Page Not Found</h1>
        <router-link to="/">Go to your account</router-link>
    </div>
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