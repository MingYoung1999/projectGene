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
                        action="https://geneherokudb.herokuapp.com/Airtable/uploads/"
                        ref="fileUpload" 
                        style="width:100%"
                        :before-upload="handleUpload"
                        :on-success="onSuccessUpload"
                        :on-format-error="handleFormatError"
                        :on-remove="onRemoveFile"
                        >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag a file here to upload<br>Only CSV</p>
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
import md5 from 'js-md5';
import cloneDeep from "lodash/cloneDeep";
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
                file: "",
                bin: [],
                MD5: "",
                Base64: "",
            },
            formRules: {
                base:[{
                    required: true,
                    trigger: 'change',
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
        handleUpload (file){
            this.$refs.fileUpload.clearFiles();
            this.$refs.fileUpload.clearFiles();
            let Name = file.name;
            if(Name.includes(".csv")){              //因為最後送出的資料是base64跟md5不是file，所以file對了才能讀
                let self = this;
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function(e){
                    let binary = '';
                    let bytes = new Uint8Array(e.target.result);
                    let len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // self.formData.bin = binary;
                    self.formData.Name = Name;
                    // self.formData.Base64 = btoa(binary);
                    // self.formData.MD5 = md5(bytes);
                }
            }
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select bin.'
            });
            this.formData.fileName = "";
            this.formData.file = "";
        },
        onSuccessUpload(response, file, fileList){
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

