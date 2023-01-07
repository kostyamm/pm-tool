<script>
import { useRouter } from 'vue-router'
import Logo from './common/Logo.vue'

export default {
    name: "Footer",
    components: { Logo },
    setup() {
        const router = useRouter()

        return { router }
    },
}
</script>

<template>
    <div class="footer">
        <div class="container">
            <div class="footer__links">
                <Logo />
                <router-link to="/components" exact>Components</router-link>
            </div>
            <div>Copyright © 2022 - {{ new Date().getFullYear() }} Pmtool. All rights reserved.</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.footer {
    background-color: $opacity-background;

    position: relative;
    z-index: 100;

    box-shadow: $box-shadow;
    height: $header-footer-height;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: inherit;
    }

    &__links {
        display: flex;
        align-items: center;

        a {
            margin-left: 30px;
        }
    }
}
</style>