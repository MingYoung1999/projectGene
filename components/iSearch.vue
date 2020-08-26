<template>
  <div class="inputs">
        <Input
            v-model.trim="search"
            :type="type"
            :size="size"
            :placeholder="placeholder"
            :clearable="clearable"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :style="{'width': width+'px'}"
            search
            @on-search="onSearch"
            @on-keyup="onKeyup"/>
  </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        size: {
            type: String,
            default: 'default',
        },
        placeholder: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: null
        },
        botton: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
        onSearch() {
            this.$emit('onSearch', this.search)
        },
        onKeyup() {
            this.$emit('onKeyup', this.search)
        }
    }
}
</script>
<style>
.inputs {
    margin-bottom: 15px;
}
</style>