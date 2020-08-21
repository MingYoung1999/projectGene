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
            <Button type="primary" size="large" long :loading="loading" @click="onClickLogin('loginForm')">Login</Button>
        </div>
    </div>
</template>
<script>
export default {
    layout: "main",
    data () {
        return {
            isShowLoginForm: false,
            isLoginInfo: false,
            loading: false,
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
    mounted() {
        setTimeout(() => {
            this.isShowLoginForm = true
        }, 200);
    },
    methods: {}
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
