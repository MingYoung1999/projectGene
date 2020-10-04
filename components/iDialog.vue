<template>
  <Modal
        v-model="show"
        :footer-hide="footerHide"
        :closable="closable"
        :mask-closable="maskClosable"
        :width="width"
        @on-cancel="cancel">
        <Row style="padding:10px 5px">
            <div v-if="icon" style="float:left">
                <Icon v-if="icontype=='info'" type="ios-information-circle" color="#2db7f5" size="25"/>
                <Icon v-if="icontype=='success'" type="ios-checkmark-circle" color="#19be6b" size="25"/>
                <Icon v-if="icontype=='warning'" type="md-alert" color="#ff9900" size="25"/>
                <Icon v-if="icontype=='error'" type="ios-close-circle" color="#ed4014" size="25"/>
            </div>
            <span style="font-weight:600;font-size:15px;float:left;margin:2px 5px">
            {{title}}
            </span>
        </Row>
        <Row v-if="content!=''" style="padding:10px 10px;font-size:14px">{{content}}</Row>
        <slot></slot>
        <Row style="padding:2px 0">
            <Button style="float:right" v-if="contentConfirmBtn" type="primary" @click="ok">確定</Button>
            <Button style="float:right;margin-right:10px" v-if="contentCancelBtn" @click="cancel">取消</Button>
        </Row>
        <div slot="footer">
            <Button v-if="cancelbtn" @click="cancel">取消</Button>
            <Button v-if="confirmbtn" type="primary" @click="ok">確定</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 360,
        },
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        visible: {
            required: true,
            type: Boolean
        },
        footerHide: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        confirmbtn: {
            type: Boolean,
            default: true
        },
        cancelbtn: {
            type: Boolean,
            default: true
        },
        contentConfirmBtn: {
            type: Boolean,
            default: false
        },
        contentCancelBtn: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        },
        icontype: {
            type: String,
            default: 'info'
        }
    },
    data() {
        return {
            show: false
        };
    },
    watch: {
        visible: function() {
            this.show = this.visible;
        }
    },
    methods: {
        cancel() {
            this.$emit("onClickCancel");
        },
        ok() {
            this.$emit("onClickConfirm");
        },
    }

}
</script>

<style>

</style>