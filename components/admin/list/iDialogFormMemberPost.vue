<template>
    <Modal
        v-model="show"
        title="新增使用者"
        width="500"
        :footer-hide="true"
        @on-cancel="onClickCancelMemberPost">
            <Form :model="formData" ref="formData" :rules="formRules">
                <FormItem label="Username" prop="username" :label-width="100">
                    <Input v-model.trim="formData.username"/>
                </FormItem>
                <FormItem label="Email" prop="email" :label-width="100">
                    <Input v-model.trim="formData.email" type="email"/>
                </FormItem>
                <FormItem label="Password" prop="password" :label-width="100">
                    <Input v-model.trim="formData.password" type="password"/>
                </FormItem>
                <FormItem label="Phone" prop="phone" :label-width="100">
                    <Input v-model.trim="formData.phone"/>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelMemberPost" size="large">取消</Button>
                <Button @click="onClickConfirmMemberPost" size="large" type="primary" style="margin-left:20px;">確定</Button>
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
                username: "",
                password: "",
                email: "",
                phone: "",
            },
            formRules: {
                username:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                password:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
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
                this.$refs.formData.resetFields();
            };
            this.show = this.visible;
        },
    },
    methods: {
        onClickCancelMemberPost(){
            this.$emit("onClickCancel");
        },
        onClickConfirmMemberPost(){
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

