<script>
import logo from '../../assets/images/logo.svg'
import { useRouter } from 'vue-router'

export default {
    name: "Logo",
    props: {
        text: String
    },
    setup() {
        const router = useRouter()

        return { logo, router }
    },
}
</script>

<template>
    <div class="logo">
        <img :src="logo" @click="router.push('/')" alt="PM Tool" title="Pm Tool" />
        <router-link to="/" v-if="text" class="logo__text text-h4">{{ text }}</router-link>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.logo {
    display: flex;
    align-items: center;

    &__text {
        margin-left: 10px;
        white-space: nowrap;
    }

    img {
        cursor: pointer;
    }
}
</style>