<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'Notice',
    setup() {
        const store = useStore()

        const notices = computed(() => store.getters['notices'])

        const removeNotice = (id) => store.commit('removeNotice', id)

        return { notices, removeNotice }
    },
}
</script>

<template>
    <transition name="list">
        <div class="notices-wrapper" v-if="notices.length">
            <TransitionGroup name="list" tag="span">
                <div
                    v-for="notice in notices"
                    :key="`${notice.id}_${notice.message}`"
                    :class="notice.status"
                    class="notice"
                >
                    <h3 class="text-h4">{{ notice.title }}</h3>
                    <p class="text-p">{{ notice.message }}</p>
                    <button class="outline" @click="removeNotice(notice.id)">
                        <mdi-close />
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.list-enter-active {
    transition: all 0.3s ease;

}

.list-leave-active {
    transition: all 0s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.notices-wrapper {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 200;
    width: 100%;
    max-width: 320px;
}

.notice {
    position: relative;
    background-color: $black;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    padding: 15px 45px 15px 20px;

    &.error {
        :deep(.text-h4) {
            color: $error;
        }

        :deep(.text-p) {
            margin-left: -8px;
            padding-left: 8px;
            border-left: 2px solid $error;
        }
    }

    &.success {
        :deep(.text-h4) {
            color: $tertiary;
        }

        :deep(.text-p) {
            margin-left: -8px;
            padding-left: 8px;
            border-left: 2px solid $tertiary;
        }
    }

    button {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 2px;

        svg {
            font-size: 8px;
        }
    }

    &:not(:last-child) {
        margin-bottom: 8px;
    }
}

</style>