<template>
    <div>
        <Row>
            <Button
                style="float:left;margin-right:10px"
                icon="ios-undo"
                size="small"
                @click="onClickBack">返回</Button>
        </Row>
    </div>
</template>

<script>
export default {
    methods: {
        onClickBack(){
            this.$emit('onClickBack');
        },
    },
}
</script>

<style>

</style>