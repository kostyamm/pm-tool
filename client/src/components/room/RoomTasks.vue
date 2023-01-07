<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Field from '../../components/UI/Field.vue'

export default {
    name: "RoomTasks",
    components: { Field },
    emits: ['addTask', 'skipTask'],
    setup(props, { emit }) {
        const store = useStore()

        const task = ref(null)

        const addTask = () => {
            emit('addTask', task.value)
            task.value = null
        }

        const openTask = (url) => window.open(url, '_blank')

        const skipTask = () => emit('skipTask')

        const isOwner = computed(() => store.getters['room/isOwner'])
        const tasks = computed(() => store.getters['room/tasks'])
        const users = computed(() => store.getters['room/users'])
        const roomName = computed(() => store.getters['room/room'].name)

        const isVoted = computed(() => users.value.every(({ vote }) => vote))

        return { tasks, users, roomName, isOwner, isVoted, task, addTask, skipTask, openTask }
    },
}
</script>

<template>
    <div class="room-tasks">
        <h2 class="text-h3">Room name:</h2>
        <div class="text-p">{{ roomName }}</div>

        <h2 class="text-h3">User connected:</h2>
        <div v-for="user of users" :key="user.userId" class="text-p">
            {{ user.userName }} {{ user.vote && `[${user.vote}]` }}
        </div>

        <h2 class="text-h3">Task list:</h2>
        <ul>
            <li
                v-for="(item, index) of tasks"
                :key="`${item}_${index}`"
                :class="{'active': item.active}"
            >
                <a @click="openTask(item.url)" class="text-p">{{ item.url }}</a>
                <div class="text-p">{{ item.vote && `[${item.vote}]` }}</div>
            </li>
        </ul>

        <div v-if="isOwner" class="room-tasks__settings">
            <Field label="Task link" v-model="task" @keypress.enter="addTask" />
            <button class="button-large button-icon-right" :disabled="!task" @click="addTask">
                Add task
                <mdi-plus />
            </button>
            <button class="button-large button-icon-right" :disabled="!isVoted" @click="skipTask">
                Skip active task
                <mdi-minus />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.room-tasks {
    h2 {
        padding: 12px 0 6px;
    }

    & ul > li {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & a {
            padding: 6px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover {
                filter: none;
            }
        }

        &.active {
            width: calc(100% - 24px);
            padding: 0 12px;

            position: relative;
            background-color: $grey-a;
            border-radius: $border-radius-small;
            border-left: 2px solid $white;
        }
    }

    &__settings {
        position: sticky;
        background-color: $dark;
        padding: 12px 0;
        bottom: 0;
        left: 0;

        display: flex;
        flex-direction: column;

        & *:not(:last-child) {
            margin-bottom: 12px;
        }
    }
}
</style>