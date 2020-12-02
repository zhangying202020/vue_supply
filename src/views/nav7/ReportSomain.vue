<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">月度报表</BreadcrumbItem>
          <BreadcrumbItem to="">月度销售情况</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Form ref="formInline" inline>
            <FormItem label="" prop="time" >
              <DatePicker type="month" 
              format="yyyy-MM" @on-change="changeDate" placeholder="Select month" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="monthSearch()">月度销售单查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="formData" border style="margin-top: 10px">
          <template slot-scope="{ row, index }" slot="endtotalnum">
              <span>{{row[index].endtotalnum}}</span></template>
          <template slot-scope="{ row, index }" slot="totalnum">
              <span>{{row[index].totalnum}}</span></template>
          <template slot-scope="{ row, index }" slot="sototal">
              <span>{{row[index].sototal}}</span></template>
          <template slot-scope="{ row, index }" slot="totalpay">
              <span>{{row[index].totalpay}}</span></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" @click="search()">明细</Button>
          </template>
        </Table>
        <Modal v-model="producmodal" title="销售单明细"  :width="1000" >
            <Table :columns="productcolumns" :data="productdata" border>
              <template slot-scope="{ row, index }" slot="soId">
                <Input v-model="row.soId"></Input></template>
              <template slot-scope="{ row, index }" slot="customerCode">
                <Input v-model="row.customerCode"></Input></template>
              <template slot-scope="{ row, index }" slot="account">
                <Input v-model="row.account"></Input></template>
              <template slot-scope="{ row, index }" slot="createTime">
                <Input v-model="row.createTime"></Input></template>
              <template slot-scope="{ row, index }" slot="soTotal">
                <Input v-model="row.soTotal"></Input></template>
              <template slot-scope="{ row, index }" slot="payType">
                <Input v-model="row.payType"></Input></template>
              <template slot-scope="{ row, index }" slot="status">
                <Input v-model="row.status"></Input></template>

            </Table>
        </Modal>
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
      date:"",
      formData: [],
      columns: [
        {title: "已了结数", key: "endtotalnum",align: "center"},
        {title: "销售单数", key: "totalnum",align: "center"},
        {title: "销售总金额",key: "sototal",align: "center"},
        {title: "已付款金额",key: "totalpay",align: "center"},
        {title: "操作", slot: "action",align: "center"},
      ],
      //明细      
      producmodal:false,
      productdata:[],
      productcolumns: [
        {title: '销售单编号',key: 'soId',slot: 'soId',width:150},
        {title: '客户编号',key: 'customerCode',slot: 'customerCode'},
        {title: '客户名称',key: 'account',slot: 'account',width:120},
        {title: '销售日期',key: 'createTime',slot: 'createTime'},
        {title: '销售单总金额',key: 'soTotal',slot: 'soTotal'},
        {title: '经手人',key: 'payType',slot: 'payType'},
        {title: '未付款金额',key: '',slot: ''},
        {title: '销售单状态',key: 'status',slot: 'status'},
      ],

    };
  },
  methods:{
    changeDate(date){this.date=date},
    // 查询
    monthSearch() {
      this.formData=[]
      axios.post("/cgi/main/report/somain/main?time="+this.date+"&page=1").then((resp) => {
          if(resp.data.totalnum!=0){
            let arr=[]
            arr=resp.data,
            resp.data.sototal=resp.data.sototal.toFixed(2)
            resp.data.totalpay=resp.data.totalpay.toFixed(2)
            this.formData.push(arr)
            this.$Message.success('Success!');
          }else{this.$Message.error('Fail!')}
        })
    },
    search(){
      this.producmodal = true
      axios.post("/cgi/main/report/somain/main?time="+this.date+"&page=1").then((resp) => {
          this.productdata=resp.data.details.list;
          this.$Message.success('Success!');
        });
    },
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
