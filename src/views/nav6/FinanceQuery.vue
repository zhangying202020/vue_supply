<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">收支管理</BreadcrumbItem>
          <BreadcrumbItem to="">收支查询</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem label="" prop="type">
                <span>收支状态</span>
                <Select v-model="formInline.type" style="width:100px">
                    <Option value="收入">收款</Option>
                    <Option value="支出">付款</Option>
                </Select>
            </FormItem>  
            <FormItem prop="date">
                <DatePicker type="daterange"  v-model="formInline.date" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="search('formInline')">查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 730px; margin-top: 10px">
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
      </Content>
    </Layout>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
import LoginVue from '../Login.vue';
export default {
  data() {
    return {
    formInline: {type:"",date:'',startDate:'',endDate:'',},
    model1: "",
    pageData: [],
    columns: [
        {title: "序号", type: "index", width: 60, align: "center" },
        {title: "订单编号",key:"ordercode",},
        {title: "创建用户",key:"account",width:100},
        {title: "收付款金额",key: "payPrice",width:120},
        {title: "收付款时间",key:"payTime",width:170},
        {title: "付款方式",key:"payType",width:100},
    ],	
    };
  },
  methods:{
    // 查询
    search(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.formInline.startDate=this.formInline.date[0]
                this.formInline.endDate=this.formInline.date[1]
                axios.post("/cgi/main/finance/query?type="+this.formInline.type+"&page="+1).then((resp) => {
                    this.pageData =resp.data;
                    this.$Message.success('Success!');
        });
    } else {this.$Message.error('Fail!');}})},
    //分页
    changepage(page) {
      axios.post("/cgi/main/finance/query?type="+this.formInline.type+"&page="+page).then((resp) => {
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
