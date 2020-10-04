<template>
    <Modal
        v-model="show"
        title="新增病人"
        width="450"
        :footer-hide="true"
        @on-cancel="onClickCancelPatientPost">
            <Form :model="formData" ref="formData" :rules="formRules">
                <FormItem label="First name" prop="first_name" :label-width="75">
                    <Input v-model.trim="formData.first_name"/>
                </FormItem>
                <FormItem label="Last Name" prop="last_name" :label-width="75">
                    <Input v-model.trim="formData.last_name"/>
                </FormItem>
                <FormItem label="Birthday" prop="birth" :label-width="75">
                    <DatePicker v-model="tmpbirth" type="date" :clearable="false" format="yyyy-MM-dd" placeholder="Select date"></DatePicker>
                </FormItem>
                <FormItem label="Gender" prop="gender" :label-width="75">
                    <Select v-model="formData.gender">
                        <Option value="male"><Icon type="md-male" color="#78C2C4"/>   male</Option>
                        <Option value="female"><Icon type="md-female" color="#EEA9A9"/>   female</Option>
                    </Select>
                </FormItem>
                <FormItem label="Allergen" prop="allergen" :label-width="75">
                    <Input v-model.trim="formData.allergen"/>
                </FormItem>
                <FormItem label="Email" prop="email" :label-width="75">
                    <Input v-model.trim="formData.email"/>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelPatientPost" size="large">取消</Button>
                <Button @click="onClickConfirmPatientPost" size="large" type="primary" style="margin-left:20px;">確定</Button>
            </div>
    </Modal>
</template>

<script>
var formatDate = function (date) {  
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d; 
    return y + '-' + m + '-' + d;  
};
export default {
    props:{
        visible:{
            type: Boolean,
            required: true
        },
    },
    data(){
        return{
            show: false,
            tmpbirth: "",
            formData: {
                first_name: "",
                last_name: "",
                birth: "",
                gender: "",
                allergen: "",
                email: "",
            },
            formRules: {
                first_name:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                last_name:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                birth:[{
                    required: true,
                    trigger: 'change',
                    message: "必填",
                }],
                gender:[{
                    required: true,
                    trigger: 'change',
                    message: "必填",
                }],
            },
        };
    },
    watch: {
        visible: function () {
            if(this.visible){
                this.$refs.formData.resetFields();
            };
            this.show = this.visible;
        },
        tmpbirth: function(){
            this.formData.birth = formatDate(this.tmpbirth);
        },
    },
    methods: {
        onClickCancelPatientPost(){
            this.$emit("onClickCancel");
        },
        onClickConfirmPatientPost(){
            this.$refs.formData.validate((valid) => {
                if(valid){
                    this.$emit("onClickConfirm", this.formData);
                } else{
                    this.$Message.error("錯誤請修正");
                }
            })
        },
    },
}
</script>

<style scoped>
.UpdateDialogFooter{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    background: #fff;
    padding: 10px 16px;
}
</style>

