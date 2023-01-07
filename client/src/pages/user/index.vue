<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "index",
    setup () {
        const store = useStore()
        const user = computed(() => store.getters['user/user'])

        return { user }
    }
}
</script>

<template>
    <h1 class="text-h1">{{user.name}}</h1>
    <p class="text-p"><strong>Email:</strong> {{user.email}}</p>
    <p class="text-p"><strong>ID:</strong> {{user.id}}</p>
</template>

<style lang="scss" scoped>
.user {

}
</style>