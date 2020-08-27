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
            <TabPane label="詳細資料">
                <gene :data="data"/>
            </TabPane>
            <TabPane label="用藥紀錄">
                <record/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import gene from '@/components/main/gene'
import record from '@/components/main/record'
export default {
    components: {
        gene,
        record,
    },
    props: {
        data: {
            type: Object,
            required: true,
            default: () => { return {} },
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