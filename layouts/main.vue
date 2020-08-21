<template>
    <Layout>
        <!-- <Sider class="layout-sider">
            <div class="personal">
                <Avatar icon="ios-person"/>
                <span>醫生您好</span>
            </div>
            <Menu
                v-for="item in siderMenu" :key="item.name"
                theme="dark"
                width="auto">
                <MenuItem 
                    :name="item.path"
                    :to="item.path"
                    class="menuitem">{{item.name}}</MenuItem>
            </Menu>
        </Sider> -->
        <Layout>
            <Header class="layout-header">
                <top/>
            </Header>
            <Content class="layout-body">
                <nuxt/>
            </Content>
            <Footer class="layout-footer">
                <div class="layout-footer-div">
                    Copyright ©{{new Date().getFullYear()}} NTUT, Ltd.All rights reserved.
                </div>
            </Footer>
        </Layout>
    </Layout>
</template>

<script>
import top from '@/components/layouts/top'
export default {
    components: {
        top,
    },
    data(){
        return{
            siderMenu:[
                {
                    name:'main',
                    path:"/",
                },
            ],
        }
    }
}
</script>

<style scoped>
.layout-sider{
    padding:0;
}
.personal{
    height:200px;
    width:100%;
    color:whitesmoke;
    font-size:20px;
}
.menuitem{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:20px;
}
.layout-header{
    margin: 0;
    padding: 1% 3% 2% 4%;
    background: #fff;
}
.layout-body{
    height: calc(100vh - 128px);
    overflow-y:auto;
    padding:1%;
    background: #fff;
    margin: 2% 1.5% 0% 1.5%;
}
.layout-footer{
    margin:0;
    padding:0;
    background: #fff;
}
.layout-footer-div{
    text-align: center;
    line-height: 35px;
    margin: 0 auto;
    font-size: 10px;
}
</style>