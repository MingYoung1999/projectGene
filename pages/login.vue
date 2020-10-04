<template>
    <div class="v-bg">
        <Spin size="large" v-if="loading"></Spin>
        <div class="div_login">
            <Form ref="loginForm" :model="loginForm" :rules="loginRules">
                <FormItem prop="Account">
                    <Input type="text" v-model="loginForm.Account" placeholder="Account" size="large" prefix="ios-person"/>
                </FormItem>
                <FormItem prop="Password">
                    <Input type="password" v-model="loginForm.Password" placeholder="Password" size="large" prefix="ios-lock"/>
                </FormItem>
            </Form>
            <Button type="primary" size="large" long @click="onClickLogin">Login</Button>
        </div>
        <iDialog
            :visible.sync="isShowDialog"
            title="Error"
            :content="errorMsg"
            :closable="false"
            :maskClosable="false"
            :cancelbtn="false"
            :contentConfirmBtn="true"
            :footerHide="true"
            :icon="true"
            icontype="error"
            :width="360"
            @onClickConfirm="onClickError"
        />
    </div>
</template>
<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import iDialog from '@/components/iDialog';
import { mapGetters, mapActions } from "vuex";
export default {
    layout: "main",
    components: {
        iDialog,
    },
    data () {
        return {
            isShowDialog: false,
            isShowLoginForm: false,
            isLoginInfo: false,
            loading: false,
            errorMsg: "",
            loginForm: {
                Account: '',
                Password: '',
            },
            loginRules: {
                Account: [
                    { required: true, message: 'Please Enter Account', trigger: 'blur' }
                ],
                Password: [
                    { required: true, message: 'Please Enter Password', trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        ...mapActions("modules/auth/", ["setToken","setAuth"]),
        onClickLogin(){
            this.$refs.loginForm.validate((valid) => {
                if(valid){
                    try{
                        axios({
                            method: "post",
                            url: "https://geneherokudb.herokuapp.com/login/",
                            header: { "Content-Type": "application/json" },
                            data:{
                                email: this.loginForm.Account,
                                password: this.loginForm.Password,
                            },
                        }).then((response) => {
                            if(response.data.token) { 
                                this.setToken(response.data.token)
                                if(jwt_decode(response.data.token).admin){
                                    this.setAuth("admin");
                                }
                                else if(jwt_decode(response.data.token).staff){
                                    this.setAuth("staff");
                                }
                                else {
                                    this.setAuth("viewer");
                                }
                                this.$router.push('/');
                            } else {
                                this.errorMsg = response.data.erro;
                                this.isShowDialog = true;
                            }
                        })
                    }
                    catch(error){
                        console.log(error);
                    }
                } else{
                    this.$Message.error("錯誤請修正");
                }
            })
        },
        onClickError(){
            this.isShowDialog = false;
            this.errorMsg = "";
        }
    },
    mounted() {
        setTimeout(() => {
            this.isShowLoginForm = true
        }, 200);
    },
}
</script>
<style scoped>
.v-bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-position: 50% -40%;;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size:cover;
    background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/9f160261887393.5a806fe646628.gif');
    opacity: 0.7;
}
.div_login{
    width: 400px;
    border: 1px solid #4d4d4d;
    border-radius: 30px;
    padding: 60px;
    background-color: #fff;
}
</style>
