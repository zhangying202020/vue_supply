<template>
    <div class="layout" >
        <Layout>
            <Header id="header">
                <Breadcrumb separator=">">
                    <span>位置:</span>
                    <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/error">404错误提示</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content id="content">
                <img src="../../static/images/404.png" alt="">
                <h3>非常遗憾，您访问的页面不存在</h3>
                <p>看到这个提示，就自认倒霉吧！</p>
                <Button type="primary" to="/homepage">返回首页</Button>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {}
</script>
<style scoped>
div{background-color: #EDF6FA!important;}
#header{text-align: left; height: 40px;line-height: 40px;padding: 0 20px;} 
#header span:first-of-type{color: #000;font-weight: bolder;} 
#content{height: 540px;text-align: center;padding-top: 40px;border-top: 1px solid #ccc;}
h3,p{position: relative;top: -60px;width: 300px;margin: auto;}
h3{left: 30px;}
p{left: 14px;color: #bbb8b8;}
</style>
