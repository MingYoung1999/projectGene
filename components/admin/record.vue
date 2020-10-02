<template>
    <div>
        <iTable
            :columns="columns"
            :data="medData"/>
    </div>
</template>

<script>
import axios from 'axios';
import cloneDeep from "lodash/cloneDeep";
import iTable from '@/components/iTable';
function customDate(dateText){
    var date = ''
    dateText = dateText.split("T")
    date = dateText[0]
    return date
}
export default {
    components: {
        iTable,
    },
    props:{
        ID: {
            type: Number,
            required: true,
        }
    },
    data(){
        return{
            loading: true,
            medData: [],
            tmp: [],
            columns:[
                {
                    title: '日期',
                    align: 'center',
                    sortable: true,
                    key: 'medical_date',
                },
                {
                    title: '醫院別',
                    align: 'center',
                    sortable: false,
                    key: 'hospital',
                },
                {
                    title: '藥名',
                    align: 'center',
                    sortable: false,
                    key: 'medical_name',
                },
                {
                    title: '用法',
                    align: 'center',
                    sortable: false,
                    key: 'medical_instructions',
                },
                {
                    title: '備註',
                    align: 'center',
                    sortable: false,
                    key: 'medical_description',
                },
            ],
        }
    },
    mounted(){
        axios({
            method: "get",
            url: "https://geneherokudb.herokuapp.com/history/",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE2MzkwNzMsImV4cCI6MTYwMTg5ODI3M30.zm7i6Q8tUKsezLhWPDaV_oB50JMobiVghCCQK6AUlE0",
                "Content-Type": "application/json",
            },
            params: {
                patient_ID: this.ID,
            }
        })
        .then(response => (this.tmp = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        })
        .then(()=>{
            for(var i in this.tmp){
                this.tmp[i].medical_date = customDate(this.tmp[i].medical_date)
            }
            this.medData = cloneDeep(this.tmp);
        })
        .then(()=>{this.loading = false})
    }
}
</script>

<style>

</style>