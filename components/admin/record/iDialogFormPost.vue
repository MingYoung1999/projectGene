<template>
    <Modal
        v-model="show"
        title="新增用藥紀錄"
        width="450"
        :footer-hide="true"
        @on-cancel="onClickCancelPost">
            <Form :model="formData" ref="formData" :rules="formRules">
                <FormItem label="日期" prop="medical_date" :label-width="75">
                    <Input v-model.trim="formData.medical_date"/>
                </FormItem>
                <FormItem label="醫院別" prop="hospital" :label-width="75">
                    <Input v-model.trim="formData.hospital"/>
                </FormItem>
                <FormItem label="藥名" prop="medical_name" :label-width="75">
                    <Input v-model.trim="formData.medical_name"/>
                </FormItem>
                <FormItem label="用法" prop="medical_instructions" :label-width="75">
                    <Input v-model.trim="formData.medical_instructions"/>
                </FormItem>
                <FormItem label="備註" prop="medical_description" :label-width="75">
                    <Input v-model.trim="formData.medical_description"/>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelPost" size="large">取消</Button>
                <Button @click="onClickConfirmPost" size="large" type="primary" style="margin-left:20px;">確定</Button>
            </div>
    </Modal>
</template>

<script>
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
            formData: {
                medical_date: "",
                hospital: "",
                medical_name: "",
                medical_instructions: "",
                medical_description: "",
            },
            formRules: {
                medical_date:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                hospital:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                medical_name:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                medical_instructions:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
            },
        };
    },
    watch: {
        visible: function () {
            this.$refs.formData.resetFields();
            this.show = this.visible;
        },
    },
    methods: {
        onClickCancelPost(){
            this.$emit("onClickCancel");
        },
        onClickConfirmPost(){
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

