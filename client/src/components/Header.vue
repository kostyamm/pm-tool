<script>
import UserBlock from './common/UserBlock.vue'
import Logo from './common/Logo.vue'

export default {
    name: "Header",
    components: { Logo, UserBlock },
}
</script>

<template>
    <div class="header">
        <div class="container">
            <Logo text="PM Tool" />
            <div class="header__links">
                <router-link to="/components" exact>Components</router-link>
                <UserBlock />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.header {
    background-color: $opacity-background;

    position: relative;
    z-index: 100;

    box-shadow: $box-shadow;
    height: $header-footer-height;

    & .container, &__links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: inherit;
    }

    &__links {
        a {
            margin-right: 30px;
        }
    }
}
</style>
