<template>
    <Modal
        v-model="show"
        title="修改病人資料"
        width="450"
        :footer-hide="true"
        @on-cancel="onClickCancelEdit">
            <Form :model="cloneData" ref="cloneData" :rules="formRules">
                <FormItem label="姓" prop="first_name" :label-width="75">
                    <Input v-model.trim="cloneData.first_name"/>
                </FormItem>
                <FormItem label="名" prop="last_name" :label-width="75">
                    <Input v-model.trim="cloneData.last_name"/>
                </FormItem>
                <FormItem label="性別" prop="gender" :label-width="75">
                    <Input v-model.trim="cloneData.gender"/>
                </FormItem>
                <FormItem label="生日" prop="birth" :label-width="75">
                    <Input v-model.trim="cloneData.birth"/>
                </FormItem>
                <FormItem label="過敏原" prop="allergen" :label-width="75">
                    <Input v-model.trim="cloneData.allergen"/>
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
        patientData:{
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
                gender:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                birth:[{
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
            this.cloneData = cloneDeep(this.patientData);
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

