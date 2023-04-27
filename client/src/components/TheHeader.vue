<script setup>
import { onMounted, ref } from 'vue'
import Logo from './common/Logo.vue'
import TheHeaderUser from './TheHeaderUser.vue'
import Cookies from 'js-cookie'

const isDark = ref(true)

const COOKIES_THEME_KEY = 'dark-theme'
const THEME_CLASS = 'dark'

const changeTheme = (isDark) => {
    const classList = document.querySelector('html').classList

    classList[isDark ? 'add' : 'remove'](THEME_CLASS)
}

const handleSwitch = (value) => {
    Cookies.set(COOKIES_THEME_KEY, value)

    changeTheme(value)
}

onMounted(() => {
    const theme = Cookies.get(COOKIES_THEME_KEY)
    const themeValue = theme === undefined || JSON.parse(theme)

    isDark.value = themeValue

    changeTheme(themeValue)
})
</script>

<template>
    <el-page-header @back="$router.push('/')">
        <template #icon>
            <Logo />
        </template>
        <template #title>
            PM Tool
        </template>
        <template #content>
            <el-menu
                mode="horizontal"
                :default-active="$route.path"
                :ellipsis="false"
                router
            >
                <el-menu-item index="/about">About</el-menu-item>
            </el-menu>
        </template>
        <template #extra>
            <div class="header__extra">
                <TheHeaderUser />
                <el-divider direction="vertical" />
                <el-switch v-model="isDark" @change="handleSwitch" />
            </div>
        </template>
    </el-page-header>
</template>

<style scoped>
.el-menu--horizontal {
    border-bottom: none;
}

.header__extra {
    display: flex;
    align-items: center;
    max-height: var(--el-header-height);

}
</style>
