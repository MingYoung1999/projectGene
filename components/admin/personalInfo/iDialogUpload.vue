<template>
    <Modal
        v-model="show"
        title="上傳病人基因資料"
        width="450"
        :footer-hide="true"
        @on-cancel="onClickCancelUpload">
            <Form>
                <FormItem prop="fileName">
                <Upload 
                        type="drag"
                        accept=".csv"
                        :format="['csv']"
                        action="https://geneherokudb.herokuapp.com/Airtable/uploads/"
                        ref="fileUpload"
                        style="width:100%"
                        :on-success="onSuccessUpload"
                        :on-format-error="handleFormatError"
                        >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag a file here to upload<br>Only CSV</p>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
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
        };
    },
    watch: {
        visible: function () {
            this.show = this.visible;
            this.$refs.fileUpload.clearFiles();
        },
    },
    methods: {
        onClickCancelUpload(){
            this.$emit("onClickCancel");
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select bin.'
            });
        },
        onSuccessUpload(response, file, fileList){
            this.$emit("uploadFile", file.name);
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

