<template>
    <div>
        <div class="dev_text">
            <p>姓名：{{patientData.last_name}} ,{{patientData.first_name}}</p>
        </div>
        <div class="dev_text">
            <p>性別：{{patientData.gender}}</p>
        </div>
        <div class="dev_text">
            <p>生日：{{birthday}}</p>
        </div>
        <div class="dev_text">
            <p>過敏原：</p>
        </div>
    </div>
</template>

<script>
function customDate(dateText){
    var date = ''
    dateText = dateText.split("T")
    date = dateText[0]
    return date
}
export default {
    props:{
        patientData: {
            type: Object,
            required: true,
            default: () => { return {} },
        },
    },
    data(){
        return{
            birthday: "",
        }
    },
    mounted(){
        this.birthday = customDate(this.patientData.birth)
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