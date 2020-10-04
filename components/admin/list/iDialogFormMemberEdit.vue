<template>
    <Modal
        v-model="show"
        title="修改使用者資料"
        width="500"
        :footer-hide="true"
        @on-cancel="onClickCancelMemberEdit">
            <Form :model="formData" ref="formData" :rules="formRules">
                <FormItem label="Username" prop="username" :label-width="100">
                    <Input v-model.trim="formData.username"/>
                </FormItem>
                <FormItem label="Level" prop="level" :label-width="100">
                    <Select v-model="formData.level">
                        <Option value="1" label="Viewer"></Option>
                        <Option value="2" label="Staff"></Option>
                        <Option value="3" label="Admin"></Option>
                    </Select>
                </FormItem>
                <FormItem label="Phone" prop="phone" :label-width="100">
                    <Input v-model.trim="formData.phone"/>
                </FormItem>
                <FormItem label="Email" prop="email" :label-width="100">
                    <Input v-model.trim="formData.email"/>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelMemberEdit" size="large">取消</Button>
                <Button @click="onClickConfirmMemberEdit" size="large" type="primary" style="margin-left:20px;">確定</Button>
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
        memberData: {
            type: Object,
            required: true,
            default: () => { return {} },
        },
    },
    data(){
        return{
            show: false,
            formData: {},
            formRules: {
                username:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                level:[{
                    required: true,
                    trigger: 'change',
                    message: "必填",
                }],
                email:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
            },
        };
    },
    watch: {
        visible: function () {
            if(this.visible){
                this.formData = cloneDeep(this.memberData);
            };
            this.show = this.visible;
        },
    },
    methods: {
        onClickCancelMemberEdit(){
            this.$emit("onClickCancel");
        },
        onClickConfirmMemberEdit(){
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

