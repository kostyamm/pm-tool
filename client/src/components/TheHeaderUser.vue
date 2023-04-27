<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const options = [
    { label: 'Account', to: '/user' },
    { label: 'Rooms', to: '/user/rooms' },
]

const router = useRouter()
const store = useStore()
const isAuth = computed(() => store.getters['user/isAuth'])
const user = computed(() => store.getters['user/user'])

const logOut = () => {
    store.dispatch('user/logout')
    router.push('/login')
}
</script>

<template>
    <el-button-group v-if="!isAuth">
        <el-button @click="$router.push('/login')" type="primary">Sing in</el-button>
        <el-button @click="$router.push({ path: '/login', query: {registration: 'true'} })">Sing up</el-button>
    </el-button-group>

    <el-dropdown v-else type="secondary" trigger="click">
        <el-button link>{{ user.name }}</el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="({ label, to }, index) in options"
                    :key="index"
                    @click="$router.push(to)"
                >
                    {{ label }}
                </el-dropdown-item>
                <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
