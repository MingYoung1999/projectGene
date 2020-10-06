<template>
    <div>
        <Row>
            <Button size="large" type="success" @click="onClickEditPersonal" class="dev_text"><Icon type="md-build"/> 編輯</Button>
            <Button size="large" type="success" @click="onClickUpload" class="dev_text"><Icon type="ios-cloud-upload"/> 上傳檔案</Button>
        </Row>
        <div class="dev_text">
            <p>姓名：{{patientData.last_name}} ,{{patientData.first_name}}</p>
        </div>
        <div class="dev_text">
            <p>性別：{{patientData.gender}}</p>
        </div>
        <div class="dev_text">
            <p>生日：{{patientData.birth}}</p>
        </div>
        <div class="dev_text">
            <p>過敏原：{{patientData.allergen}}</p>
        </div>
        <iDialogForm
            :patientData="patientData"
            :visible="isShowDialogEditPersonal"
            @onClickCancel="onClickCancelEdit"
            @onClickConfirm="onClickConfirmEdit"/>
        <iDialogUpload
            :visible="isShowDialogUpload"
            @onClickCancel="onClickCancelUpload"
            @uploadFile="uploadFile"/>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import iDialogForm from '@/components/admin/personalInfo/iDialogForm'
import iDialogUpload from '@/components/admin/personalInfo/iDialogUpload'
function customDate(dateText){
    var date = ''
    dateText = dateText.split("T")
    date = dateText[0]
    return date
}
export default {
    components:{
        iDialogForm,
        iDialogUpload,
    },
    props:{
        ID: {
            type: Number,
            required: true,
        }
    },
    data(){
        return{
            isShowDialogEditPersonal: false,
            isShowDialogUpload: false,
            patientData: {},
        }
    },
    methods: {
        onClickEditPersonal(){
            this.isShowDialogEditPersonal = true;
        },
        onClickCancelEdit(){
            this.isShowDialogEditPersonal = false;
        },
        onClickConfirmEdit(val){
            axios({
                method: "put",
                url: "https://geneherokudb.herokuapp.com/patientAPI/detail/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    patient_ID: val.patient_ID,
                    first_name: val.first_name,
                    last_name: val.last_name,
                    gender: val.gender,
                    birth: val.birth,
                    email: val.email,
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/patientAPI/detail/",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                    params: {
                        patient_ID: this.ID,
                    },
                }).then((response) => {this.patientData = response.data[0]})
                    .then(() => {this.patientData.birth = customDate(this.patientData.birth)})
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    })
            })
            this.isShowDialogEditPersonal = false;
        },
        onClickUpload(){
            this.isShowDialogUpload = true;
        },
        onClickCancelUpload(){
            this.isShowDialogUpload = false;
        },
        uploadFile(val){
            axios({
                method: "post",
                url: "https://geneherokudb.herokuapp.com/Airtable",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    table: this.ID,
                    base: "patient",
                    filename: val
                },
            })
            this.isShowDialogUpload = false;
        },
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
    mounted(){
        axios({
            method: "get",
            url: "https://geneherokudb.herokuapp.com/patientAPI/detail/",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json",
            },
            params: {
                patient_ID: this.ID,
            },
            })
            .then((response) => {this.patientData = response.data[0]})
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
            .then(() => {this.patientData.birth = customDate(this.patientData.birth)})
    }
}
</script>

<style>
.dev_text{
    margin-left: 2.5%;
    margin-top: 20px;
    font-size: 20px;
}
</style>