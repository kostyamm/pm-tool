<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const directives = {
    'click-outside': {
        mounted(el, binding, vnode) {
            el.clickOutsideEvent = (event) => {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value(event, el);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent);
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.clickOutsideEvent);
        },
    },
}

const props = {
    title: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    positionTop: Boolean,
    positionLeft: Boolean,
    icon: Object,
}
export default {
    name: "Dropdown",
    directives,
    props,
    setup() {
        const show = ref(false)
        const router = useRouter()

        const onClickOption = ({ to, action }) => {
            if (to) router.push(to)
            if (action) action()
        }

        return { show, onClickOption }
    },
}
</script>

<template>
    <div v-click-outside="() => show = false" class="menu">

        <button @click="show = !show" class="button-icon-left outline" :class="{'button-icon-right' : icon}">
            <mdi-chevron-down v-if="!show" />
            <mdi-chevron-up v-else />
            {{ title }}
            <component v-if="icon" :is="icon" />
        </button>

        <transition name="slide-right">
            <div
                v-if="show"
                :class="[
                    'menu__block',
                    positionTop ? 'menu__block--top' : 'menu__block--bottom',
                    positionLeft ? 'menu__block--left' : 'menu__block--right'
                    ]"
            >
                <ul>
                    <li v-for="option in options" :key="option.label">
                        <a @click="onClickOption(option)">{{ option.label }}</a>
                    </li>
                </ul>
            </div>
        </transition>

    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
@import "../../assets/styles/transitions";

.menu {
    position: relative;

    &__block {
        position: absolute;
        width: 100%;
        z-index: 10;
        background-color: $grey;
        border-radius: $border-radius;
        padding: 14px 20px;
        box-shadow: $box-shadow;

        &--top {
            bottom: calc(100% + 4px);
        }

        &--bottom {
            top: calc(100% + 4px);
        }

        &--left {
            left: 0;
        }

        &--right {
            right: 0;
        }

        a {
            color: $dark;
        }
    }
}
</style>