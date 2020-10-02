<template>
    <div>
        <div v-if="loading" class="div_loading">
            <div class="loader"></div>
        </div>
        <div v-else>
            <Row>
                <Button
                    style="float:left;margin-right:10px"
                    icon="ios-undo"
                    size="small"
                    @click="onClickBack">返回</Button>
            </Row>
            <Tabs>
                <TabPane label="基因分析結果">
                    <gene :data="data"/>
                </TabPane>
                <TabPane label="個人資料">
                    <personalInfo/>
                </TabPane>
                <TabPane label="用藥紀錄">
                    <record :ID="ID"/>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import personalInfo from '@/components/admin/personalInfo';
import gene from '@/components/admin/gene';
import record from '@/components/admin/record';
export default {
    components: {
        gene,
        record,
        personalInfo,
    },
    props: {
        patientData: {
            type: Object,
            required: true,
            default: () => { return {} },
        },
        ID: {
            type: Number,
            required: true,
        },
    },
    data(){
        return{
            data: [],
            loading: true,
        }
    },
    methods: {
        onClickBack(){
            this.$emit('onClickBack');
        },
    },
    mounted(){
        axios({
            method: "get",
            url: "https://geneherokudb.herokuapp.com/Airtable/getMatchRecords",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE2MzkwNzMsImV4cCI6MTYwMTg5ODI3M30.zm7i6Q8tUKsezLhWPDaV_oB50JMobiVghCCQK6AUlE0",
                "Content-Type": "application/json",
            },
            params: {
                compare_table: "premature_mutation",
                patient_ID: this.ID,
            }
        })
        .then(response => (this.data = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        })
        .then(()=>{this.loading = false})
    },
}
</script>

<style>
.div_loading{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: auto;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>