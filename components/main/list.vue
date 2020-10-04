<template>
    <div>
        <Row>
            <iSearch style="float:left" @onKeyup="onSearchKeyup"/>
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
import { mapGetters } from "vuex";
import iTable from '@/components/iTable';
import iSearch from '@/components/iSearch';
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
                    (data.patient_ID != undefined ? data.patient_ID.toString().includes(this.searchContext.toString()):"")||
                    (data.first_name != undefined ? data.first_name.toLowerCase().includes(this.searchContext.toLowerCase()):"")||
                    (data.last_name != undefined ? data.last_name.toLowerCase().includes(this.searchContext.toLowerCase()):"")
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
    watch: {
        patientLsit(){
            this.setSearchResaultData();
        },
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
    mounted() {
        axios
        .get('https://geneherokudb.herokuapp.com/patientAPI/',
            {
                headers:{
                    'Authorization': this.token,
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