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
                <TabPane label="個人資料">
                    <personalInfo :patientData="patientData"/>
                </TabPane>
                <TabPane label="基因分析結果">
                    <gene :ID="ID"/>
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
import personalInfo from '@/components/main/personalInfo';
import gene from '@/components/main/gene';
import record from '@/components/main/record';
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
            loading: false,
        }
    },
    methods: {
        onClickBack(){
            this.$emit('onClickBack');
            console.log(this.data);
        },
    },
    mounted(){},
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