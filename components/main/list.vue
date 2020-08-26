<template>
    <iTable
        :data="searchResultData"
        :columns="columns"
    />
</template>

<script>
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
            searchResultData: [],
            columns: [
                {
                    title: 'ID',
                    key: 'ID',
                    align: 'center',
                    sotrable: false,
                },
                {
                    title: 'Name',
                    key: 'Name',
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
        setData() {
            this.searchResultData = this.paData;
        },
        onClickShowDetail(row) {
            this.$emit("onClickShowDetail", row)
        }
    },
    computed: {
        ...mapGetters("modules/main/", ["paData"]),
    },
    watch: {
        paData() {
            this.setData();
        },
    },
    mounted() {
        this.setData();
    },
}
</script>

<style>

</style>