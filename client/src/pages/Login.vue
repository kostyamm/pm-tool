<script>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useNotice } from '../hooks/useNotice.js'
import Field from '../components/UI/Field.vue'

export default {
    name: 'Login',
    components: { Field },
    setup() {
        const isAuthForm = ref(true)
        const emailEl = ref()
        const formData = reactive({})

        const { errorNotice } = useNotice()
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        watch(() => route.query.registration, val => {
            isAuthForm.value = val !== 'true'

            if (isAuthForm.value) {
                emailEl.value?.childRef.focus()
            }

        }, { immediate: true })

        const submit = async () => {
            const { confirmPassword, ...userData } = formData
            const password = userData.password
            const isInvalidPassword = !password || !confirmPassword || password !== confirmPassword

            const requestType = isAuthForm.value ? 'signIn' : 'signUp'

            if (!isAuthForm.value && isInvalidPassword) {
                return errorNotice({ message: 'Password or password confirmation is invalid' })
            }

            const result = await store.dispatch(`user/${requestType}`, userData)

            if (result) {
                router.push(route.query.to || '/')
            }
        }

        return { emailEl, formData, isAuthForm, submit }
    },
}
</script>

<template>
    <div class="login">
        <div class="login__form">
            <h1>{{ isAuthForm ? 'Authorization' : 'Registration' }}</h1>

            <Field v-if="!isAuthForm"
                   v-model="formData.name"
                   label="name"
                   ref="name"
                   required
                   placeholder="Enter name..."
                   @keypress.enter="submit" />
            <Field ref="emailEl"
                   v-model="formData.email"
                   label="email"
                   required
                   placeholder="Enter email..."
                   @keypress.enter="submit" />
            <Field label="password"
                   v-model="formData.password"
                   required
                   placeholder="Enter password..."
                   @keypress.enter="submit"
                   type="password" />
            <Field v-if="!isAuthForm"
                   label="confirm password"
                   v-model="formData.confirmPassword"
                   required
                   placeholder="Enter password..."
                   @keypress.enter="submit"
                   type="password" />

            <div class="login__form__footer">
                <div>
                    Go to
                    <a @click="isAuthForm = !isAuthForm">{{ isAuthForm ? 'Registration' : 'Authorization' }}</a>
                </div>

                <button @click="submit" class="button-large button-icon-right">
                    Sign in
                    <mdi-chevron-right />
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.login-image {
    opacity: 0.7;
    position: absolute;
    content: ' ';
    z-index: -10;
    height: 50vh;
    width: 100vw;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
}

.login {
    position: relative;
    display: flex;
    justify-content: center;
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

    &__form {
        position: relative;
        z-index: 20;
        padding-bottom: 80px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: calc(#{$max-width} / 2.5);
        width: calc(#{$max-width} / 2.5);

        & > *:not(:last-child) {
            margin-bottom: 24px;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>