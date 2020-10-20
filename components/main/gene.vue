<template>
<div>
    <div v-if="isShowTotalRisk" class="div_riskText">
        <p>早產相對風險比為：{{totalRisk}}</p>
    </div>
    <div v-else>
        <Button type="success" @click="onClickGene">開始分析</Button>
    </div>
    <div id="ideo-container"></div>
    <div v-if="isShowTotalRisk">
        <h1 style="margin: 0 0 2px 2%">Match</h1>
        <iTable
            :data="match"
            :columns="matchColumns"
            :showTotal="true"
            :total="match.length"/>
        <h1 style="margin: 0 0 2px 2%">Mismatch</h1>
        <iTable
            :data="misMatch"
            :columns="misMatchColumns"
            :showTotal="true"
            :total="misMatch.length"/>
    </div>
</div>
</template>

<script>
var roundDecimal = function (val, precision) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}
import { mapGetters } from "vuex";
import iTable from '@/components/iTable';
import axios from 'axios';
import * as d3 from 'd3';
export default {
    components: {
        iTable,
    },
    props: {
        ID: {
            type: Number,
            required: true,
        }
    },
    data(){
        return{
            geneData: [],
            totalRisk: 0.0,
            tmp: {},
            isShowTotalRisk: false,
            misMatch: [],
            match: [],
            matchColumns: [
                {
                    title: 'chr',
                    align: 'center',
                    sortType: "desc",
                    sortable: true,
                    key: 'chr',
                },
                {
                    title: 'position',
                    align: 'center',
                    sortable: false,
                    key: 'position',
                },
                {
                    title: 'name',
                    align: 'center',
                    sortable: false,
                    key: 'name',
                },
                {
                    title: 'type',
                    align: 'center',
                    sortable: false,
                    key: 'type',
                },
                {
                    title: 'ref',
                    align: 'center',
                    sortable: false,
                    key: 'ref',
                },
                {
                    title: 'alt',
                    align: 'center',
                    sortable: false,
                    key: 'alt',
                },
                {
                    title: 'ratio',
                    align: 'center',
                    sortable: false,
                    key: 'ratio',
                },
            ],
            misMatchColumns: [
                {
                    title: 'chr',
                    align: 'center',
                    sortType: "desc",
                    sortable: true,
                    key: 'chr',
                },
                {
                    title: 'position',
                    align: 'center',
                    sortable: false,
                    key: 'position',
                },
                // {
                //     title: 'name',
                //     align: 'center',
                //     sortable: false,
                //     key: 'name',
                // },
                // {
                //     title: 'type',
                //     align: 'center',
                //     sortable: false,
                //     key: 'type',
                // },
                {
                    title: 'ref',
                    align: 'center',
                    sortable: false,
                    key: 'ref',
                },
                {
                    title: 'alt',
                    align: 'center',
                    sortable: false,
                    key: 'alt',
                },
                // {
                //     title: 'ratio',
                //     align: 'center',
                //     sortable: false,
                //     key: 'ratio',
                // },
            ],
        }
    },
    methods:{
        onClickGene(){
            let ax = axios.create({timeout:60000});
            ax({
                method: "get",
                url: "https://geneherokudb.herokuapp.com/Airtable/getMatchRecords",
                headers: {
                    "Authorization": this.token,
                    "Content-Type": "application/json",
                },
                params: {
                    compare_table: "premature_mutation",
                    patient_ID: this.ID,
                }
            })
            .then(response => (this.geneData = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            })
            .then(()=>{
                this.tmp = this.geneData.pop();
                this.totalRisk = roundDecimal(this.tmp.total_relative_risk ,3);
                this.isShowTotalRisk = true;
                let self = this;
                d3.select('#ideo-container')
                .text(function(d){
                    var list = [];
                    for(var i in self.geneData){
                        if(self.geneData[i].status==="match"){
                            list.push({
                                chr: self.geneData[i].chr,
                                start: parseInt(self.geneData[i].position),
                                stop: parseInt(self.geneData[i].position),
                                shape: self.geneData[i].shape,
                                color: self.geneData[i].color,
                                name: self.geneData[i].name + "<br>" + self.geneData[i].Ref + "->" + self.geneData[i].Alt + " <br>ratio:" + self.geneData[i].ratio,
                            })
                            self.match.push({
                                chr: self.geneData[i].chr,
                                position: parseInt(self.geneData[i].position),
                                name: self.geneData[i].name,
                                ratio: roundDecimal(self.geneData[i].ratio ,3),
                                ref: self.geneData[i].Ref,
                                alt: self.geneData[i].Alt,
                                type: self.geneData[i].type,
                            })
                        } else{
                            self.misMatch.push({
                                chr: self.geneData[i].chr,
                                position: parseInt(self.geneData[i].position),
                                name: self.geneData[i].name,
                                ratio: roundDecimal(self.geneData[i].ratio ,3),
                                ref: self.geneData[i].Ref,
                                alt: self.geneData[i].Alt,
                                type: self.geneData[i].type,
                            })
                        }
                    }
                    var ideogram = new Ideogram({
                        organism: 'human',
                        container: '#ideo-container',
                        dataDir: 'https://cdn.jsdelivr.net/npm/ideogram@1.20.0/dist/data/bands/native/',
                        annotations: list,
                        // legend: legend,
                    })
                });
            });
        }
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
    mounted() {}
}
</script>

<style scoped>
.div_riskText{
    font-size: 25px;
    margin-left: 1%;
    margin-bottom: 5px;
}
#ideo-container{
    margin-left: 1%;
    margin-bottom: 10px;
}
</style>