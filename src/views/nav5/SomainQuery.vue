<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">销售管理</BreadcrumbItem>
          <BreadcrumbItem to="">销售单查询</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin: 30px 50px">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem label="" prop="soId" >
                <span>销售单编号</span>
                <Input type="text" v-model="formInline.soId" style="width:150px" ></Input>
            </FormItem>
            <FormItem prop="date">
                <DatePicker type="daterange"  v-model="formInline.date" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem label="" prop="status">
                <span>处理状态</span>
                <Select v-model="formInline.status" style="width:100px">
                    <Option value="1">新增</Option>
                    <Option value="2">已入库</Option>
                    <Option value="3">已付款</Option>
                    <Option value="4">已了结</Option>
                    <Option value="5">已预付</Option>
                </Select>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="search('formInline')">查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 1000px; margin-top: 10px">
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
    formInline: {poId:"",status: '',date:'',startDate:'',endDate:'',},
    model1: "",
    pageData: [],
    columns: [
        {title: "序号", type: "index", width: 60, align: "center" },
        {title: "销售单编号", key:"soId" ,width: 150,align: "center"},
        {title: "创建时间",key:"createTime",width: 120},
        {title: "客户编号",key:"customerCode", width: 120, align: "center" },
        {title: "创建用户",key:"account",},
        {title: "附加费用",key:"tipFee",},
        {title: "采购产品总价",key:"productTotal",},
        {title: "采购购单总价",key:"poTotal",},
        {title: "付款方式",key:"payType",},
        {title: "处理状态",key: "status",},
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
                axios.post("/cgi/main/sell/somain/query",qs.stringify(this.formInline)).then((resp) => {
                    this.pageData =resp.data;
                    this.$Message.success('Success!');
        });
    } else {this.$Message.error('Fail!');}})},
    //分页
    changepage(page) {
      axios.post("/cgi/main/sell/somain/query?page="+page).then((resp) => {
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
