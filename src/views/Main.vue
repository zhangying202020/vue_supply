<template>
    <div class="layout" >
        <Layout>
            <Header id="header">
                <Breadcrumb separator=">">
                    <span>位置:</span>
                    <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content id="content">
                <div>
                    <img src="../../static/images/sun.png">
                    <span>欢迎使用信息管理系统</span>
                </div>
                <div>
                    <img src="../../static/images/time.png">
                    <span>您登陆的时间:</span>
                    <datatime class="time"></datatime>
                </div>
            </Content>
        </Layout>
    </div>
</template>
<script>
import datatime from "@/views/Nowtime.vue";
export default {
    components: { datatime },
    data(){
        return{
        }
  }
}
</script>
<style scoped>
#header{text-align: left; height: 40px;line-height: 40px;border-bottom: 1px solid #ccc;padding: 0 20px;} 
#header span:first-of-type{color: #000;font-weight: bolder;} 
#content{height: 540px;padding: 20px;}
#content div{height: 40px;line-height: 40px;}
#content div>img{float: left;}
#content div span{margin-left: 20px;}
.time{
    clear: left;
    float: left;
    position: relative;
    left: 160px;
    top: -39px;
}
</style>
