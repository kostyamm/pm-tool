<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Dropdown from '../UI/Dropdown.vue'
import AccountCircleOutline from '~icons/mdi/account-circle-outline'

export default {
    name: "UserBlock",
    components: { Dropdown },
    setup() {
        const router = useRouter()
        const store = useStore()

        const isAuth = computed(() => store.getters['user/isAuth'])
        const user = computed(() => store.getters['user/user'])

        const options = [
            { label: 'Account', to: '/user' },
            { label: 'Rooms', to: '/user/rooms' },
            {
                label: 'Log out', action: () => {
                    store.dispatch('user/logout')
                    router.push('/login')
                },
            },
        ]

        return { options, router, isAuth, user, AccountCircleOutline }
    },
}
</script>

<template>
    <div v-if="!isAuth" class="user-block">
        <button class="outline" @click="router.push('/login')">LOGIN</button>
        <button @click="router.push({ path: '/login', query: {registration: 'true'} })">REGISTER</button>
    </div>
    <Dropdown v-else :title="user.name" :options="options" :icon="AccountCircleOutline" />
</template>

<style lang="scss" scoped>
.user-block {
    display: flex;

    button.outline {
        margin-right: 10px;
    }
}
</style>