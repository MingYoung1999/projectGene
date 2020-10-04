<template>
    <Modal
        v-model="show"
        title="上傳基因檔案"
        width="600"
        :footer-hide="true"
        @on-cancel="onClickCancelUpload">
            <Form :model="formData" ref="formData" :rules="formRules">
                <FormItem label="病名" prop="base" :label-width="100">
                    <Select v-model="formData.base">
                        <Option value="premature" label="premature"></Option>
                    </Select>
                </FormItem>
                <FormItem label="名稱" prop="table" :label-width="100">
                    <Input v-model.trim="formData.table"/>
                </FormItem>
                <FormItem label="File" prop="fileName" :label-width="100">
                    <Upload 
                        type="drag"
                        accept=".csv"
                        :format="['csv']"
                        action="" 
                        ref="fileUpload" 
                        style="width:100%"
                        :on-success="onSuccessUpload"
                        :on-format-error="handleFormatError"
                        :on-remove="onRemoveFile"
                        >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click here to upload</p>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
            <div class="UpdateDialogFooter">
                <Button @click="onClickCancelUpload" size="large">取消</Button>
                <Button @click="onClickConfirmUpload" size="large" type="primary" style="margin-left:20px;">確定</Button>
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
                base: "",
                table: "",
                fileName: "",
            },
            formRules: {
                base:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                table:[{
                    required: true,
                    trigger: 'blur',
                    message: "不能為空",
                }],
                fileName:[{
                    required: true,
                    trigger: 'change',
                    message: "不能為空",
                }],
            },
        };
    },
    watch: {
        visible: function () {
            if(this.visible){
                this.$refs.formData.resetFields();
                this.$refs.fileUpload.clearFiles();
            };
            this.show = this.visible;
        },
    },
    methods: {
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select bin.'
            });
            this.formData.fileName = "";
        },
        onSuccessUpload(response, file, fileList){
            this.$refs.fileUpload.clearFiles();
            this.formData.fileName = file.name;
        },
        onRemoveFile(file, fileList){
            this.formData.fileName = "";
        },
        onClickCancelUpload(){
            this.$refs.fileUpload.clearFiles();
            this.$emit("onClickCancel");
        },
        onClickConfirmUpload(){
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

