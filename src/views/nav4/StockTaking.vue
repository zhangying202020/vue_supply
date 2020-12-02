<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">库存管理</BreadcrumbItem>
          <BreadcrumbItem to="">库存盘点</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 800px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="checkstock(row)">盘点</Button  >
          </template>
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
      pageData: [],
      columns: [
        { type: "index", title: "序号", width: 80, align: "center" },
        { title: "产品编号", key: "productCode",width: 120,},
        { title: "产品名称", key: "name"},
        { title: "当前库存",key: "num",width: 100,},
        { title: "采购在途数", key: "soNum",width: 120},
        { title: "预销售数", key: "poNum",width: 100},
        { title: "操作", slot: "action", width: 140, align: "center" },
      ],
    }
  },
  mounted() {
    axios.get("/cgi/main/stock/query?page="+1).then((resp) => {
        this.pageData = resp.data;
      });
  },
    methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/stock/query?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },
    checkstock(row) {
      this.$router.push({name:'addstock',params:{productCode:row.productCode,originNum:row.num}})
    },
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
.vertical-center-modal {display: flex;align-items: center;justify-content: center;}
.vertical-center-modal .ivu-modal {top: 0;}
</style>
