<script>
import { computed, toRefs } from 'vue'
import { ref } from 'vue'

const props = {
    modelValue: [String, Number],
    label: String,
    error: String,
    success: String,
    description: String,
    required: Boolean,
}
export default {
    inheritAttrs: false,
    name: "Field",
    props,
    setup(props, { attrs, emit }) {
        const { error, success } = toRefs(props)

        const field = ref(null)
        const childRef = computed(() => field?.value);

        const disablePressing = (event) => {
            if (attrs.type !== 'number') {
                return
            }
            if (event.keyCode === 187 || event.keyCode === 189 || event.keyCode === 69) {
                event.preventDefault();
            }
        }

        const dynamicClasses = {
            'success': success.value && !error.value,
            'error': error.value,
            'disabled': attrs.disabled,
        }

        const onInput = (e) => {
            emit('update:modelValue', e.target.value)
        }

        return {
            onInput,
            childRef,
            field,

            disablePressing,
            dynamicClasses,
            error,
            success,
        }
    },
}
</script>

<template>
    <div class="input-group" :class="dynamicClasses">
        <label v-if="label || required" :class="{required}">{{ label }}</label>

        <div class="input">
            <input
                :value="modelValue"
                v-bind="$attrs"
                ref="field"
                @keydown="disablePressing"
                @input="onInput"
            />
        </div>

        <div v-if="description" class="description-message">{{ description }}</div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="success" class="success-message">{{ success }}</div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/ui/input";
</style>