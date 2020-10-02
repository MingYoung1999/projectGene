<template>
<div>
    <div id="ideo-container"></div>
    <p>abcd</p>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
    prop:{
        data: {
            type: Array,
            required: true,
            default: () => { return [] },
        },
    },
    data(){
        return{}
    },
    methods:{},
    // mounted: function () {
    //     return new Ideogram({
    //         organism: 'human',
    //         container: '#ideo-container',
    //         annotations: list,
    //         legend: this.legend,
    //     })
    // },
    mounted() {
        d3.select('#ideo-container')
            .text(function(d){
                var list = [];
                var i = 0;
                var people = [];
                
                people.push(
                    {
                        chr: "11",
                        position: 118894558
                    },
                    {
                        chr:"19",
                        position:10005699
                    },
                    {
                        chr:"19",
                        position:52384651
                    },
                    {
                        chr:"19",
                        position:52842068
                    }
                );
                var legend = [{
                name: 'Significance',
                rows: [
                    {name: 'Mismatch', color: '#F00', shape: 'triangle'},
                    {name: 'Match', color: '#8D4', shape: 'triangle'}
                ]
                }];
                var shape = 'm0,0 l -6 12 l 12 0 z';
                var color = "#F00";
                // for(let j = 0; j<4 ;j++){
                    list.push({
                        name: "123",
                        chr: people[2].chr,
                        start: people[2].position,
                        stop: people[2].position,
                        shape: shape,
                        color: color
                    });
                // }
                var ideogram = new Ideogram({
                    organism: 'human',
                    container: '#ideo-container',
                    dataDir: 'https://cdn.jsdelivr.net/npm/ideogram@1.20.0/dist/data/bands/native/',
                    annotations: list,
                    legend: legend,
                })
            });
    }
}
</script>

<style>

</style>