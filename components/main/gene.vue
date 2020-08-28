<template>
    <div>
        <ideo/>
    </div>
</template>

<script>
import ideo from '@/components/main/ideo'
export default {
    prop:{
        data: {
            type: Object,
            required: true,
            default: () => { return {} },
        },
    },
    mounted() {}
}
</script>

<style>

</style>