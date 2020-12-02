<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">月度报表</BreadcrumbItem>
          <BreadcrumbItem to="">月度收支情况</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Form ref="formInline" inline>
            <FormItem label="" prop="time" >
              <DatePicker type="month" 
              format="yyyy-MM" @on-change="changeDate" placeholder="Select month" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="monthSearch()">月度收支查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="formData" border style="margin-top: 10px">
          <template slot-scope="{ row, index }" slot="receCount">
              <span>{{row.receCount}}</span></template>
          <template slot-scope="{ row, index }" slot="recePrice">
              <span>{{row.recePrice}}</span></template>
          <template slot-scope="{ row, index }" slot="payCount">
              <span>{{row.payCount}}</span></template>
          <template slot-scope="{ row, index }" slot="payPrice">
              <span>{{row.payPrice}}</span></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="searchReceipt()">收明</Button>
            <Button type="success" size="small" @click="searchPay()">付明</Button>
          </template>
        </Table>
        <Modal v-model="receiptModal" title="收款明细" :width="1000" >
            <Table :columns="receiptColumns" :data="receiptData" border>
              <template slot-scope="{ row, index }" slot="soId">
                <Input v-model="row.soId"></Input></template>
              <template slot-scope="{ row, index }" slot="account">
                <Input v-model="row.account"></Input></template>
              <template slot-scope="{ row, index }" slot="createTime">
                <Input v-model="row.createTime"></Input></template>
              <template slot-scope="{ row, index }" slot="pay_time">
                <Input v-model="row.pay_time"></Input></template>
                <template slot-scope="{ row, index }" slot="pay_price">
                <Input v-model="row.pay_price"></Input></template>
              <template slot-scope="{ row, index }" slot="status">
                <Input v-model="row.status"></Input></template>
            </Table>
          </Modal>
          <Modal v-model="payModal" title="付款明细" :width="1000" >
            <Table :columns="payColumns" :data="payData" border>
              <template slot-scope="{ row, index }" slot="poId">
                <Input v-model="row.poId"></Input></template>
              <template slot-scope="{ row, index }" slot="account">
                <Input v-model="row.account"></Input></template>
              <template slot-scope="{ row, index }" slot="createTime">
                <Input v-model="row.createTime"></Input></template>
              <template slot-scope="{ row, index }" slot="pay_time">
                <Input v-model="row.pay_time"></Input></template>
                <template slot-scope="{ row, index }" slot="pay_price">
                <Input v-model="row.pay_price"></Input></template>
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
        {title: "收款次数", key: "receCount", align: "center"},
        {title: "收款总金额,", key: "recePrice", align: "center"},
        {title: "付款次数",key: "payCount", align: "center"},
        {title: "付款总金额",key: "payPrice", align: "center"},
        {title: "操作", slot: "action", align: "center"},
      ],
      //收款明细
      receiptModal:false,
      receiptData:[],
      receiptColumns: [
        {title: '销售单号',key: 'soId',slot: 'soId',width:150},
        {title: '销售单日期',key: 'createTime',slot: 'createTime',width:180},
        {title: '收款日期',key: 'pay_time',slot: 'pay_time',width:120},
        {title: '收款金额',key: 'pay_price',slot: 'pay_price'},
        {title: '经手人',key:'account',slot:'account'},
        {title: '处理状态',key: 'status',slot: 'status'},
      ],
      //付款明细
      payModal:false,
      payData:[],
      payColumns: [
        {title: '销售单号',key: 'poId',slot: 'poId',width:150},
        {title: '销售单日期',key: 'createTime',slot: 'createTime',width:180},
        {title: '收款日期',key: 'pay_time',slot: 'pay_time',width:120},
        {title: '收款金额',key: 'pay_price',slot: 'pay_price'},
        {title: '经手人',key:'account',slot:'account'},
        {title: '处理状态',key: 'status',slot: 'status'},
      ],
    };
  },
  methods:{
    changeDate(date){this.date=date},
    // 查询
    monthSearch() {
      this.formData=[]
      axios.post("/cgi/main/report/payment/main?time="+this.date+"&page=1").then((resp) => {
        if(resp.data.payCount!=0){
          let arr=[]
            arr=resp.data,
            resp.data.recePrice=resp.data.recePrice.toFixed(2)
            resp.data.payPrice=resp.data.payPrice.toFixed(2)
            this.formData.push(arr)
            this.$Message.success('Success!');
        }else{this.$Message.error('Fail!')}
      });
    },
    //收款明细
    searchReceipt(){
      this.receiptModal = true
      axios.post("/cgi/main/report/payment/detail/receipt?time="+this.date+"&page=1").then((resp) => {
          this.receiptData =resp.data.list;
          this.$Message.success('Success!');
        });
    },
    //付款明细
    searchPay(){
      this.payModal = true
      axios.post("/cgi/main/report/payment/detail/pay?time="+this.date+"&page=1").then((resp) => {
          this.payData =resp.data.list;
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
