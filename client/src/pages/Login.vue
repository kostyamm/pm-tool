<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotice } from '../hooks/useNotice.js'
import { useUserStore } from '../stores/UserStore.js'

const isRegistration = ref(true)
const emailEl = ref()
const formData = reactive({})

const { errorNotice } = useNotice()
const { signIn, signUp } = useUserStore()

const route = useRoute()
const router = useRouter()

const submit = async () => {
    const { confirmPassword, ...userData } = formData
    const password = userData.password
    const isInvalidPassword = !password || !confirmPassword || password !== confirmPassword

    if (isRegistration.value && isInvalidPassword) {
        return errorNotice({ message: 'Password or password confirmation is invalid' })
    }

    const result = await (!isRegistration.value ? signIn : signUp)(userData)

    if (result) {
        router.push(route.query.to || '/')
    }
}

watch(() => route.query.registration,val => {
    isRegistration.value = !!(val && JSON.parse(val))

    if (isRegistration.value) {
        return
    }
    emailEl.value?.focus()
}, { immediate: true })
</script>

<template>
    <div class="login">
        <el-card class="login__form-card">
            <el-form
                :model="formData"
                label-position="top"
                size="large"
            >
                <h1 class="text-h1">{{ !isRegistration ? 'Authorization' : 'Registration' }}</h1>

                <el-form-item
                    v-if="isRegistration"
                    required
                    label="Name"
                    @keypress.enter="submit"
                >
                    <el-input v-model="formData.name" placeholder="Your name" />
                </el-form-item>
                <el-form-item
                    required
                    label="Email"
                    type="email"
                    @keypress.enter="submit"
                >
                    <el-input ref="emailEl" v-model="formData.email" placeholder="Your email" type="email" />
                </el-form-item>
                <el-form-item
                    required
                    label="Password"
                    @keypress.enter="submit"
                >
                    <el-input
                        v-model="formData.password"
                        placeholder="Your password"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item
                    v-if="isRegistration"
                    required
                    label="Confirm password"
                    @keypress.enter="submit"
                >
                    <el-input
                        v-model="formData.confirmPassword"
                        placeholder="Your password"
                        type="password"
                        show-password
                    />
                </el-form-item>

                <el-row align="middle" justify="space-between">
                    <el-button link @click="isRegistration = !isRegistration">
                        Go to {{ !isRegistration ? 'Registration' : 'Authorization' }}
                    </el-button>
                    <el-button @click="submit">Sign in</el-button>
                </el-row>
            </el-form>
        </el-card>

    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.login-image {
    opacity: 0.7;
    position: fixed;
    content: ' ';
    z-index: -10;
    height: 50vh;
    width: $max-width;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
}

.login {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: $content-height;

    &::after {
        @extend .login-image;
        bottom: -60px;
        left: 0;
        background-image: url('../assets/images/bg-l.svg');
        background-position: center left;
    }

    &::before {
        @extend .login-image;
        top: -115px;
        right: 0;
        background-image: url('../assets/images/bg-r.svg');
        background-position: center right;
    }

    @media #{$screen-tablet} {
        &::after {
            left: -100px;
        }
        &::before {
            top: -200px;
            right: -100px;
        }
    }

    @media #{$screen-mobile} {
        &::after {
            left: -80px;
        }
        &::before {
            top: -170px;
            right: -140px;
        }
    }

    &__form-card {
        max-width: calc(#{$max-width} / 2.5);
        width: calc(#{$max-width} / 2.5);
    }
}
</style>