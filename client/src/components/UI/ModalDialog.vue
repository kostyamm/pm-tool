<script>
import { toRef } from 'vue'
import { useOverflowHidden } from '../../hooks/useOverflowHidden.js'

const props = {
    modelValue: Boolean,
    title: {
        type: String,
        default: 'Modal',
    },
}

export default {
    props,
    setup(props, { emit }) {
        const showModal = toRef(props, 'modelValue')

        const onClose = () => emit('update:modelValue', false)

        useOverflowHidden(showModal)

        return { showModal, onClose }
    },
}
</script>

<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="showModal" class="modal" @click.self="onClose">
                <div class="modal__content">
                    <div class="modal__content__title">
                        <div class="text-h2">{{ title }}</div>
                        <mdi-close @click="onClose" class="close" />
                    </div>

                    <div class="modal__content__body">
                        <slot>Modal body is empty</slot>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/transitions';

.modal {
    position: fixed;
    z-index: 110;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $black;

    &__content {
        position: relative;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -40%);
        max-width: calc(#{$max-width} / 2);
        box-shadow: $box-shadow;

        background-color: $grey-a;
        padding: 12px 24px;
        border: 2px solid $grey-b;
        border-radius: $border-radius;

        .close {
            color: $white;
            font-size: 10px;
            cursor: pointer;
            border: 2px solid $grey-b;
            border-radius: 50%;

            &:hover, &:focus {
                opacity: 0.8;
            }
        }

        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        &__body {
            overflow-y: auto;
            max-height: 50vh;
        }
    }
}
</style>