<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Field from '../../components/UI/Field.vue'

export default {
    name: "Rooms",
    components: { Field },
    setup() {
        const store = useStore()
        const roomName = ref(null)

        const rooms = computed(() => store.getters['user/rooms'])
        const guestRooms = computed(() => store.getters['user/guestRooms'])

        const onCreateRoom = () => {
            store.dispatch('user/createRoom', { name: roomName.value })
            roomName.value = null
        }

        const onRemoveRoom = (id) => store.dispatch('user/removeRoom', id)

        onMounted(async () => await store.dispatch('user/fetchRooms'))

        return { rooms, guestRooms, roomName, onCreateRoom, onRemoveRoom }
    },
}
</script>

<template>
    <div class="rooms">
        <div>
            <h1 class="text-h2">Your rooms</h1>
            <ul v-for="room in rooms" :key="room._id">
                <li class="text-p rooms__item">
                    <router-link :to='`/room/${room._id}`'>{{ room.name }}</router-link>
                    <mdi-close @click="onRemoveRoom(room._id)" />
                </li>
            </ul>
            <h1 class="text-h2">Where are you a guest</h1>
            <ul v-for="room in guestRooms" :key="room._id">
                <li class="text-p rooms__item">
                    <router-link :to='`/room/${room._id}`'>{{ room.name }}</router-link>
                </li>
            </ul>
        </div>
        <div>
            <h1 class="text-h2">Create room</h1>
            <div class="form">
                <Field v-model="roomName" label="Room name" placeholder="Enter room name ..." @keypress.enter="onCreateRoom" />
                <button @click="onCreateRoom" class="button-large button-icon-right">
                    Create
                    <mdi-card-plus-outline />
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables";
.rooms {
    display: flex;
    flex-wrap: wrap;

    & > * {
        min-width: 320px;
        flex: 1;
    }

    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 14px;

        svg {
            font-size: 8px;
            margin-left: 8px;
            border: 1px solid $white;
            border-radius: $border-radius;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>