<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "RoomVote",
    emits: ['onVote'],
    setup(props, { emit }) {
        const VOTE_VALUES = [0.5, 1, 2, 3, 5, 7]
        const store = useStore()

        const tasks = computed(() => store.getters['room/tasks'])

        const isEndVoting = computed(() => tasks.value.every(({ vote }) => vote))
        const isEmptyTasks = computed(() => !tasks.value.length)

        const onVote = (vote) => emit('onVote', vote)

        return { VOTE_VALUES, onVote, isEndVoting, isEmptyTasks }
    },
}
</script>

<template>
    <div class="room-vote">
        <h2 v-if="!isEmptyTasks && !isEndVoting" class="text-h2">Estimate in days</h2>
        <h2 v-else-if="isEmptyTasks" class="text-h2">Task list is empty</h2>
        <h2 v-else class="text-h2">Estimation completed</h2>
        <div v-if="!isEmptyTasks && !isEndVoting" class="room-vote__cards">
            <div
                v-for="item in VOTE_VALUES"
                :key="item"
                class="room-vote__cards__item"
                @click="onVote(item)"
            >{{ item }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
@import "../../assets/styles/variables-room";

.room-vote {
    min-height: $room-vote-height;
    max-height: $room-vote-height;

    h2 {
        text-align: center;
        padding-top: 12px;
    }

    &__cards {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;

            height: 120px;
            border: 1px solid $white;
            border-radius: $border-radius;
            cursor: pointer;

            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    }
}
</style>