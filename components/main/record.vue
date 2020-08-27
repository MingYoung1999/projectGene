<template>
    <div>
        <iTable
            :columns="columns"/>
    </div>
</template>

<script>
import iTable from '@/components/iTable'
export default {
    components: {
        iTable,
    },
    data(){
        return{
            columns:[
                {
                    title: '日期',
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '醫院別',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: '藥名/劑量',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: '用法',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: '備註',
                    align: 'center',
                    sortable: false,
                },
            ],
        }
    },
}
</script>

<style>

</style>