<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Notice from './components/UI/Notice.vue'
</script>

<template>
    <Header />
    <div class="container">
        <router-view />
    </div>
    <Notice />
    <Footer />
</template>

<style lang="scss" scoped>
@import "./assets/styles/variables.scss";

.container {
    min-height: $content-height;
    height: 100%;
}
</style>

