<template>
    <div id="ideo"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
    prop:{
        data: {
            type: Object,
            required: true,
            default: () => { return {} },
        },
    },
    mounted() {
        d3.select('body')
            .append('svg')
            .text(function(d){
                // var list = [];
                // list.push(
                // {
                //     chr: "11",
                //     position: 118894558
                // },
                // {
                //     chr:"19",
                //     position:10005699
                // },
                // {
                //     chr:"19",
                //     position:52384651
                // },)
                var legend = [{
                    name: 'Significance',
                    rows: [
                        {name: 'Mismatch', color: '#F00', shape: 'triangle'},
                        {name: 'Match', color: '#8D4', shape: 'triangle'}
                    ]
                }];
                var ideogram = new Ideogram({
                organism: 'human',
                // annotations: list,
                legend:legend
                })
            });
    }
}
</script>

<style>

</style>