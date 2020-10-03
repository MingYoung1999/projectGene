<template>
    <Modal
        v-model="show"
        title="修改用藥資料"
        width="450"
        :footer-hide="true"
        @on-cancel="onClickCancelEdit">
            <Form :model="cloneData" ref="cloneData" :rules="formRules">
                <FormItem label="日期" prop="medical_date" :label-width="75">
                    <Input v-model.trim="cloneData.medical_date"/>
                </FormItem>
                <FormItem label="醫院別" prop="hospital" :label-width="75">
                    <Input v-model.trim="cloneData.hospital"/>
                </FormItem>
                <FormItem label="藥名" prop="medical_name" :label-width="75">
                    <Input v-model.trim="cloneData.medical_name"/>
                </FormItem>
                <FormItem label="用法" prop="medical_instructions" :label-width="75">
                    <Input v-model.trim="cloneData.medical_instructions"/>
                </FormItem>
                <FormItem label="備註" prop="medical_description" :label-width="75">
                    <Input v-model.trim="cloneData.medical_description"/>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelEdit" size="large">取消</Button>
                <Button @click="onClickConfirmEdit" size="large" type="primary" style="margin-left:20px;">確定</Button>
            </div>
    </Modal>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
    props:{
        visible:{
            type: Boolean,
            required: true
        },
        medData:{
            type: Object,
            require: true,
            default: () => { return {} },
        },
    },
    data(){
        return{
            show: false,
            cloneData: {},
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
            this.show = this.visible;
            this.cloneData = cloneDeep(this.medData);
        },
    },
    methods: {
        onClickCancelEdit(){
            this.$emit("onClickCancel");
        },
        onClickConfirmEdit(){
            this.$refs.cloneData.validate((valid) => {
                if(valid){
                    this.$emit("onClickConfirm", this.cloneData);
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

