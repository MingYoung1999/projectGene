<template>
    <div>
        <Row>
            <Button
                style="float:left;margin-right:10px"
                icon="ios-undo"
                size="small"
                @click="onClickBack">返回</Button>
        </Row>
        <Tabs>
            <TabPane label="詳細資料">詳細資料</TabPane>
            <TabPane label="用藥紀錄">用藥紀錄</TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
            default: () => {
                return {}
            }
        },
    },
    methods: {
        onClickBack(){
            this.$emit('onClickBack');
        },
    },
}
</script>

<style>

</style>