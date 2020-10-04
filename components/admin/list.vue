<template>
    <div>
        <Row>
            <iSearch style="float:left" @onKeyup="onSearchKeyup"/>
            <ButtonGroup style="margin-left: 20px">
                <Button type="success" @click="onClickShowPatientTable">病人資料庫</Button>
                <Button type="success" @click="onClickPatientPost"><Icon type="md-add"/> 新增病人</Button>
            </ButtonGroup>
            <ButtonGroup style="margin-left: 20px">
                <Button type="primary" @click="onClickShowMemberTable">使用者管理</Button>
                <Button type="primary" @click="onClickMemberPost"><Icon type="md-add"/> 新增使用者</Button>
            </ButtonGroup>
            <Button type="primary" style="margin-left: 20px" @click="onClickUpload">上傳疾病基因</Button>
        </Row>
        <iTable
            v-if="isShowPatientTable"
            :data="patientSearchResultData"
            :columns="patientColumns"
            :showTotal="true"
            :total="patientSearchResultData.length"
        />
        <iTable
            v-else
            :data="memberSearchResultData"
            :columns="memberColumns"
            :showTotal="true"
            :total="memberSearchResultData.length"
        />
        <iDialogFormPatientPost
            :visible="isShowDialogPatientPost"
            @onClickCancel="onClickCancelPatientPost"
            @onClickConfirm="onClickConfirmPatientPost"
        />
        <iDialogFormMemberEdit
            :memberData="memberData"
            :visible="isShowDialogMemberEdit"
            @onClickCancel="onClickCancelMemberEdit"
            @onClickConfirm="onClickConfirmMemberEdit"
        />
        <iDialogFormMemberPost
            :visible="isShowDialogMemberPost"
            @onClickCancel="onClickCancelMemberPost"
            @onClickConfirm="onClickConfirmMemberPost"
        />
        <iDialogFormUpload
            :visible="isShowDialogUpload"
            @onClickCancel="onClickCancelUpload"
            @onClickConfirm="onClickConfirmUpload"
        />
    </div>
</template>

<script>
import axios from 'axios';
import iTable from '@/components/iTable';
import iSearch from '@/components/iSearch';
import iDialogFormPatientPost from '@/components/admin/list/iDialogFormPatientPost';
import iDialogFormMemberEdit from '@/components/admin/list/iDialogFormMemberEdit';
import iDialogFormMemberPost from '@/components/admin/list/iDialogFormMemberPost';
import iDialogFormUpload from '@/components/admin/list/iDialogFormUpload';
import { mapGetters, mapActions } from "vuex";
export default {
    components: {
        iTable,
        iSearch,
        iDialogFormPatientPost,
        iDialogFormMemberEdit,
        iDialogFormMemberPost,
        iDialogFormUpload,
    },
    data() {
        return{
            patientList: [],
            memberList: [],
            patientSearchResultData: [],
            memberSearchResultData: [],
            memberData: {},
            searchContext: '',
            isShowPatientTable: true,
            isShowDialogPatientPost: false,
            isShowDialogMemberEdit: false,
            isShowDialogMemberPost: false,
            isShowDialogUpload: false,
            patientColumns: [
                {
                    title: 'ID',
                    key: 'patient_ID',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'First Name',
                    key: 'first_name',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Last Name',
                    key: 'last_name',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Gender',
                    align: 'center',
                    sotrable: false,
                    render:(h, params) => {
                        let arr = [];
                        let row = params.row;
                        if(row.gender === 'male'){
                            arr.push(
                                h(
                                    "Icon",
                                    {
                                        props: {
                                            type: "md-male",
                                            size: "24",
                                            color: "#78C2C4",
                                        },
                                    }
                                )
                            );
                        }
                        else if(row.gender === 'female'){
                            arr.push(
                                h(
                                    "Icon",
                                    {
                                        props: {
                                            type: "md-female",
                                            size: "24",
                                            color: "#EEA9A9",
                                        },
                                    }
                                )
                            );
                        }
                        return h("div", arr);
                    }
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
                                            this.onClickShowDetail(row);
                                        }
                                    },
                                },
                                "詳細資料"
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
                                            this.onClickDeletePatient(row);
                                        }
                                    },
                                },
                                "刪除病人"
                            )
                        )
                        return h("div", arr);
                    },
                },
            ],
            memberColumns: [
                {
                    title: 'Username',
                    key: 'username',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Email',
                    key: 'email',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Phone',
                    key: 'phone',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Level',
                    key: 'level',
                    align: 'center',
                    sotrable: false,
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
                                            this.onClickEditMember(row);
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
                                            this.onClickDeleteMember(row);
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
        //選擇Table
        onClickShowPatientTable(){
            this.isShowPatientTable = true;
        },
        //選擇Table
        onClickShowMemberTable(){
            this.isShowPatientTable = false;
        },
        onSearchKeyup(val){
            this.searchContext = val;
            this.setPatientSearchResaultData();
            this.setMemberSearchResaultData();
        },
        //病人搜尋
        setPatientSearchResaultData() {
            this.patientSearchResultData = this.patientList.filter(
                (data)=>
                    !this.searchContext ||
                    (data.patient_ID != undefined ? data.patient_ID.toString().includes(this.searchContext.toString()):"")||
                    (data.first_name != undefined ? data.first_name.toLowerCase().includes(this.searchContext.toLowerCase()):"")||
                    (data.last_name != undefined ? data.last_name.toLowerCase().includes(this.searchContext.toLowerCase()):"")
            );
        },
        //病人詳細
        onClickShowDetail(row) {
            this.$emit("onClickShowDetail", row)
        },
        //刪除病人
        onClickDeletePatient(val){
            axios({
                method: "delete",
                url: "https://geneherokudb.herokuapp.com/patientAPI/detail/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    patient_ID: val.patient_ID,
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
            .then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/patientAPI/",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                })
                .then(response => (this.patientList = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            })
        },
        //新增病人
        onClickPatientPost(){
            this.isShowDialogPatientPost = true;
        },
        onClickCancelPatientPost(){
            this.isShowDialogPatientPost = false;
        },
        onClickConfirmPatientPost(val){
            axios({
                method: "post",
                url: "https://geneherokudb.herokuapp.com/patientAPI/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    first_name: val.first_name,
                    last_name: val.last_name,
                    birth: val.birth,
                    gender: val.gender,
                    allergen: val.allergen,
                    email: val.email,
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/patientAPI",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                }).then(response => (this.patientList = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            })
            this.isShowDialogPatientPost = false;
        },
        //搜尋使用者
        setMemberSearchResaultData() {
            this.memberSearchResultData = this.memberList.filter(
                (data)=>
                    !this.searchContext ||
                    (data.ID != undefined ? data.ID.toString().includes(this.searchContext.toString()):"")||
                    (data.level != undefined ? data.level.toString().includes(this.searchContext.toString()):"")||
                    (data.username != undefined ? data.username.toLowerCase().includes(this.searchContext.toLowerCase()):"")
            );
        },
        //刪除使用者
        onClickDeleteMember(val){
            axios({
                method: "delete",
                url: "https://geneherokudb.herokuapp.com/member/detail/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    ID: val.ID,
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
            .then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/member/",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                })
                .then(response => (this.memberList = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            })
        },
        //修改使用者資料
        onClickEditMember(val){
            this.memberData = val;
            this.isShowDialogMemberEdit = true;
        },
        onClickCancelMemberEdit(){
            this.isShowDialogMemberEdit = false;
        },
        onClickConfirmMemberEdit(val){
            axios({
                method: "put",
                url: "https://geneherokudb.herokuapp.com/member/detail/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    ID: val.ID,
                    username: val.username,
                    level: val.level,
                    phone: val.phone,
                    email: val.email,
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
            .then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/member/",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                })
                .then(response => (this.memberList = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            })
            this.isShowDialogMemberEdit = false;
        },
        //新增使用者
        onClickMemberPost(){
            this.isShowDialogMemberPost = true;
        },
        onClickCancelMemberPost(){
            this.isShowDialogMemberPost = false;
        },
        onClickConfirmMemberPost(val){
            console.log(val);
            axios({
                method: "post",
                url: "https://geneherokudb.herokuapp.com/register/",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                data: {
                    username: val.username,
                    password: val.password,
                    email: val.email,
                    phone: val.phone,
                    level: "1",
                }
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://geneherokudb.herokuapp.com/member/",
                    headers: {
                        "Authorization": this.token,
                        "Content-Type": "application/json",
                    },
                }).then(response => (this.memberList = response.data))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            })
            this.isShowDialogMemberPost = false;
        },
        //上傳基因檔案
        onClickUpload(){
            this.isShowDialogUpload = true;
        },
        onClickCancelUpload(){
            this.isShowDialogUpload = false;
        },
        onClickConfirmUpload(val){
            console.log(val);
            this.isShowDialogUpload = false;
        },
    },
    watch: {
        patientList(){
            this.setPatientSearchResaultData();
        },
        memberList(){
            this.setMemberSearchResaultData();
        },
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
    mounted() {
        axios({
            method: "get",
            url: "https://geneherokudb.herokuapp.com/patientAPI/",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json",
            },
        })
        .then(response => (this.patientList = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        axios({
            method: "get",
            url: "https://geneherokudb.herokuapp.com/member/",
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json",
            },
        })
        .then(response => (this.memberList = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    },
}
</script>

<style>

</style>