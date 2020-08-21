<template>
    <div class="con">
        <div style="font-size: 18px;">
            <Breadcrumb style="margin:0 16px;line-height:64px;">
                <BreadcrumbItem to="/" class="pointer">
                    <Icon type="md-home" size="22" style="line-height:60px;padding-bottom:5px"/>
                </BreadcrumbItem>
                <BreadcrumbItem style="font-size:18px;">{{$route.name}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="margin-left: auto;">
            <Button size="large" to="/login">Log in</Button>
        </div>
    </div>
</template>

<script>
export default {
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