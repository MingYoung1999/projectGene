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
import axios from 'axios';
import gene from '@/components/main/gene'
import record from '@/components/main/record'
export default {
    components: {
        gene,
        record,
    },
    props: {
        ID: {
            type: Number,
            required: true,
        },
    },
    data(){
        return{
            data: {},
        }
    },
    methods: {
        onClickBack(){
            this.$emit('onClickBack');
        },
    },
    mounted(){
        axios
        .get('https://geneherokudb.herokuapp.com/patientAPI/detail/?patient_ID='+this.ID.toString())
        .then(response => (this.data = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    },
}
</script>

<style>

</style>