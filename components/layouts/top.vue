<template>
    <div class="con">
        <div style="font-size: 18px;">
            <Breadcrumb style="margin:0 16px;line-height:64px;">
                <BreadcrumbItem to="/" class="pointer">
                    <Icon type="md-home" size="22" style="line-height:60px;padding-bottom:5px"/>
                </BreadcrumbItem>
                <BreadcrumbItem style="font-size:18px;">{{title}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="margin-left: auto;">
            <Button v-if="isLogin" size="large" @click="logout">Log out</Button>
            <Button v-else size="large" to="/login">Log in</Button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data(){
        return{
            isLogin: false,
            title: "Login",
        }
    },
    methods:{
        ...mapActions("modules/auth/", ["setToken", "setAuth"]),
        logout(){
            this.setToken("");
            this.setAuth("");
            this.$router.push('/');
        },
    },
    watch:{
        auth: function(){
            if(this.auth){
                this.isLogin = true;
                if(this.auth === "admin"){
                    this.title = "歡迎，管理員"
                }
                else if(this.auth === "staff"){
                    this.title = "歡迎，醫師"
                }
                else if(this.auth === "viewer"){
                    this.title = "錯誤"
                }
            }
            else{
                this.isLogin = false;
                this.title = "Login"
            }
        },
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
}
</script>

<style scoped>
.con{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.pointer {
    cursor: pointer;
}

</style>