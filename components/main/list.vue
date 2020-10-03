<template>
    <div>
        <Row>
            <iSearch style="float:left" @onKeyup="onSearchKeyup"/>
            <Button type="success" to="/:site/admin" style="margin-left: 20px">管理員</Button>
        </Row>
        <iTable
            :data="searchResultData"
            :columns="columns"
            :showTotal="true"
            :total="searchResultData.length"
        />
    </div>
</template>

<script>
import axios from 'axios';
import iTable from '@/components/iTable';
import iSearch from '@/components/iSearch';
import { mapGetters, mapActions } from "vuex";
export default {
    components: {
        iTable,
        iSearch,
    },
    data() {
        return{
            patientLsit: [],
            searchResultData: [],
            searchContext: '',
            columns: [
                {
                    title: 'ID',
                    key: 'patient_ID',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Name',
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
                                        type: "error",
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
            ],
        }
    },
    methods: {
        setSearchResaultData() {
            this.searchResultData = this.patientLsit.filter(
                (data)=>
                    !this.searchContext ||
                    (data.ID != undefined ? data.ID.toString().includes(this.searchContext.toString()):"")||
                    (data.Name != undefined ? data.Name.toLowerCase().includes(this.searchContext.toLowerCase()):"")
            );
        },
        onClickShowDetail(row) {
            this.$emit("onClickShowDetail", row)
        },
        onSearchKeyup(val){
            this.searchContext = val;
            this.setSearchResaultData();
        },
    },
    computed: {
        // ...mapGetters("modules/main/", ["paData"]),
    },
    watch: {
        // paData() {
        //     this.setSearchResaultData();
        // },
        patientLsit(){
            this.setSearchResaultData();
        },
    },
    mounted() {
        axios
        .get('https://geneherokudb.herokuapp.com/patientAPI/',
            {
                headers:{
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgyLCJhZG1pbiI6dHJ1ZSwic3RhZmYiOmZhbHNlLCJpYXQiOjE2MDE2Mzc1ODMsImV4cCI6MTYwMTg5Njc4M30.MWEYnQ9mySyFuYrqD4z5786DrCRgEtv8EZTvPtGYPwY"
                },
            }
        )
        .then(response => (this.patientLsit = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    },
}
</script>

<style>

</style>