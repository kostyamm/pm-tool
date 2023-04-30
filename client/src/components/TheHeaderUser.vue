<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/UserStore.js'
import { storeToRefs } from 'pinia'

const options = [
    { label: 'Account', to: '/user' },
    { label: 'Rooms', to: '/user/rooms' },
]

const UserStore = useUserStore()
const { isAuth, user } = storeToRefs(UserStore)

const router = useRouter()

const logOut = () => {
    router.push('/login')
        .then(() => UserStore.logout())
}
</script>

<template>
    <el-button-group v-if="!isAuth && !user">
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
