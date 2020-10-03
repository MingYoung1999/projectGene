<template>
    <div>
        <iTable
            :columns="columns"
            :data="medDatas"
            :total="medDatas.length"
            :showTotal="true"/>
        <Button type="success" size="large" @click="onClickPost">新增用藥紀錄</Button>
        <iDialogFormEdit
            :medData="medData"
            :visible="isShowDialogFormEdit"
            @onClickCancel="onClickCancelEdit"
            @onClickConfirm="onClickConfirmEdit"/>
        <iDialogFormPost
            :visible="isShowDialogFormPost"
            @onClickCancel="onClickCancelPost"
            @onClickConfirm="onClickConfirmPost"/>
    </div>
</template>

<script>
import axios from 'axios';
import cloneDeep from "lodash/cloneDeep";
import iTable from '@/components/iTable';
import iDialogFormEdit from '@/components/admin/record/iDialogFormEdit';
import iDialogFormPost from '@/components/admin/record/iDialogFormPost';
function customDate(dateText){
    var date = ''
    dateText = dateText.split("T")
    date = dateText[0]
    return date
}
export default {
    components: {
        iTable,
        iDialogFormEdit,
        iDialogFormPost,
    },
    props:{
        ID: {
            type: Number,
            required: true,
        },
    },
    data(){
        return{
            loading: true,
            medDatas: [],
            medData: {},
            tmp: [],
            isShowDialogFormEdit: false,
            isShowDialogFormPost: false,
            columns:[
                {
                    title: '日期',
                    align: 'center',
                    sortable: true,
                    sortType: "desc",
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
                {
                    title: " ",
                    align: 'center',
                    sotrable: false,
                    render:(h, params) => {
                        let arr = [];
                        let row = params.row;
                        arr.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small",
                                    },
                                    on: {
                                        click:()=>{
                                            this.onClickEdit(row);
                                        }
                                    },
                                },
                                "編輯"
                            )
                        )
                        return h("div", arr);
                    },
                },
                {
                    title: " ",
                    align: 'center',
                    sotrable: false,
                    render:(h, params) => {
                        let arr = [];
                        let row = params.row;
                        arr.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                    },
                                    on: {
                                        click:()=>{
                                            this.onClickDelete(row);
                                        }
                                    },
                                },
                                "刪除"
                            )
                        )
                        return h("div", arr);
                    },
                },
            ],
        }
    },
    methods: {
        onClickDelete(val){
            axios({
                method: "delete",
                url: "https://geneherokudb.herokuapp.com/history/detail/",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                    "Content-Type": "application/json",
                },
                data: {
                    history_ID: val.history_ID,
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/history/",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                        "Content-Type": "application/json",
                    },
                    params: {
                        patient_ID: this.ID,
                    }
                })
                .then(response => (this.tmp = response.data))
                .then(()=>{
                    for(var i in this.tmp){
                        this.tmp[i].medical_date = customDate(this.tmp[i].medical_date)
                    }
                    this.medDatas = cloneDeep(this.tmp);
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
            })
        },
        onClickEdit(val){
            this.medData = val;
            this.isShowDialogFormEdit = true;
        },
        onClickCancelEdit(){
            this.isShowDialogFormEdit = false;
        },
        onClickConfirmEdit(val){
            axios({
                method: "put",
                url: "https://geneherokudb.herokuapp.com/history/detail/",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                    "Content-Type": "application/json",
                },
                data: {
                    history_ID: val.history_ID,
                    medical_name: val.medical_name,
                    hospital: val.hospital,
                    medical_date: val.medical_date,
                    medical_instructions: val.medical_instructions,
                    medical_description: val.medical_description,
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/history/",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                        "Content-Type": "application/json",
                    },
                    params: {
                        patient_ID: this.ID,
                    },
                }).then(response => (this.tmp = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
                .then(()=>{
                    for(var i in this.tmp){
                        this.tmp[i].medical_date = customDate(this.tmp[i].medical_date)
                    }
                    this.medDatas = cloneDeep(this.tmp);
                })
            })
            this.isShowDialogFormEdit = false;
        },
        onClickPost(){
            this.isShowDialogFormPost = true;
        },
        onClickCancelPost(){
            this.isShowDialogFormPost = false;
        },
        onClickConfirmPost(val){
            console.log(val);
            axios({
                method: "post",
                url: "https://geneherokudb.herokuapp.com/history/detail/",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                    "Content-Type": "application/json",
                },
                data: {
                    patient_ID: this.ID,
                    medical_name: val.medical_name,
                    hospital: val.hospital,
                    medical_date: val.medical_date,
                    medical_instructions: val.medical_instructions,
                    medical_description: val.medical_description,
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/history/",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE3MTM5NzAsImV4cCI6MTYwMTk3MzE3MH0.74SZSuJYHhoh1-ip-IVS8EIS5E6pRl5S2N8cFutL3Kk",
                        "Content-Type": "application/json",
                    },
                    params: {
                        patient_ID: this.ID,
                    },
                }).then(response => (this.tmp = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
                .then(()=>{
                    for(var i in this.tmp){
                        this.tmp[i].medical_date = customDate(this.tmp[i].medical_date)
                    }
                    this.medDatas = cloneDeep(this.tmp);
                })
            })
            this.isShowDialogFormPost = false;
        },
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
            this.medDatas = cloneDeep(this.tmp);
        })
        .then(()=>{this.loading = false})
    }
}
</script>

<style>

</style>