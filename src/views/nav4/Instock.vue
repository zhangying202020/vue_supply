<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">仓库管理</BreadcrumbItem>
          <BreadcrumbItem to="">入库登记</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
          <Tabs type="card" :animated="false" @on-click="tabsclick">
              <TabPane label="货到付款" name="1"></TabPane>
              <TabPane label="款到发货" name="2"></TabPane>
              <TabPane label="预付款到发货" name="3"></TabPane>
          </Tabs>
          <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 1000px; margin-top: 10px">
              <template slot-scope="{ row, index }" slot="action"><Button type="error" size="small" @click="instork(row)">入库</Button></template>
          </Table>
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
      tabName:'',
      model1: "",
      pageData: [],
      columns: [
        {title: "序号", type: "index", width: 60, align: "center" },
        {title: "采购单编号", key:"poId" ,width: 150,align: "center"},
        {title: "创建时间",key:"createTime",width: 120},
        {title: "供应商名称",key:"venderName", width: 120, align: "center" },
        {title: "创建用户",key:"account",},
        {title: "附加费用",key:"tipFee",},
        {title: "采购产品总价",key:"productTotal",},
        {title: "采购单总价",key:"poTotal",},
        {title: "付款方式",key:"payType",},
        {title: "最低预付款金额",key:"payType",},
        {title: "处理状态",key: "status",},
        {title: "操作",slot: "action",width: 80,},
    ],	
    };
  },
  methods:{
    tabsclick(name){
      axios.post("/cgi/main/purchase/pomain/show?type=2&payType="+name+"&page=1").then((resp) => {
        this.pageData=resp.data
      })
    },
    //分页
    changepage(page) {
      axios.post("/cgi/main/purchase/pomain/show?type=2&payType="+name+"&page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },
    instork(row){
      this.$Modal.confirm({
        title: '操作',
        content: '<p>是否要入库？</p>',
        onOk: () => {
          axios.post("/cgi/main/stock/instock?poId="+row.poId+"&payType="+row.payType).then((resp) => {
            this.$Message.success('success');
            })},
        onCancel: () => {this.$Message.info('取消操作');}});
    }
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
