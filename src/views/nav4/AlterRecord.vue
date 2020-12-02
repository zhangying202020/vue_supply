<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
            <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
            <BreadcrumbItem to="">仓库管理</BreadcrumbItem>
            <BreadcrumbItem to="">库存查询</BreadcrumbItem>
            <BreadcrumbItem to="">库存变更记录</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
          <Tabs type="card" :animated="false" @on-click="tabsclick">
              <TabPane label="入库" name="1"></TabPane>
              <TabPane label="出库" name="2"></TabPane>
          </Tabs>
          <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="margin-top: 10px"></Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
      </Content>
    </Layout>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      pageData: [],
      columns: [
        {title: "序号", type: "index", width: 60, align: "center" },
        {title: "相关采购单号",key:"orderCode",align: "center"},
        {title: "入/出库时间", key:"stockTime",align: "center"},
        {title: "入/出库经手人",key:"createUser", align: "center" },
        {title: "入/出库数量",key:"stockNum",align: "center"},
        {title: "入/出库类型",key:"stockType",align: "center"},
    ],
    };
  },
  methods:{
    tabsclick(name){
        axios.post("/cgi/main/stock/alterRecord?page=1&stockType="+name+"&productCode="+this.$route.params.productCode).then((resp) => {
            this.pageData=resp.data.data
            console.log(resp.data.data);
      })
    },
    //分页
    changepage(page) {
        axios.post("/cgi/main/stock/alterRecord?page="+page+"&stockType="+name+"&productCode="+this.$route.params.productCode).then((resp) => {
        this.pageData = resp.data;
      })
    },
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
