<script>
import { toRef } from 'vue'
import { useOverflowHidden } from '../../hooks/useOverflowHidden.js'

export default {
    name: "SidePanel",
    props: {
        modelValue: Boolean,
    },
    setup(props, { emit }) {
        const showPanel = toRef(props, 'modelValue')

        const onClose = () => emit('update:modelValue', false)

        useOverflowHidden(showPanel)

        return { showPanel, onClose }
    },
}
</script>

<template>
    <teleport to="body">
        <transition name="slide-left">
            <div v-if="showPanel" class="side" @click.self="onClose">
                <div class="side__panel">
                    <slot />
                </div>

                <button class="side__close button-large button-icon-left" @click="onClose">
                    Close
                    <mdi-close />
                </button>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
@import "../../assets/styles/transitions";

$side-width: 320px;

.side {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    height: 100vh;
    width: 100vw;
    background-color: $black;

    &__panel {
        width: calc(#{$side-width} - 32px);
        position: fixed;
        top: 0;
        left: 0;
        height: calc(100vh - 96px);
        background-color: $grey-a;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 48px 16px;
    }

    &__close {
        position: absolute;
        top: 15px;
        left: calc(#{$side-width - 48px});
    }
}
</style>