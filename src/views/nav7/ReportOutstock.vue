<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">月度报表</BreadcrumbItem>
          <BreadcrumbItem to="">月度出库情况</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Form ref="formInline" inline>
            <FormItem label="" prop="time" >
              <DatePicker type="month" 
              format="yyyy-MM" @on-change="changeDate" placeholder="Select month" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="monthSearch()">月度出库报表查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="formData" border style="margin-top: 10px">
          <template slot-scope="{ row, index }" slot="total">
              <span>{{row.total}}</span></template>
          <template slot-scope="{ row, index }" slot="totalnum">
              <span>{{row.totalnum}}</span></template>
          <template slot-scope="{ row, index }" slot="productTotal">
              <span>{{row.productTotal}}</span></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" @click="search()">明细</Button>
          </template>
        </Table>
        <Modal v-model="producmodal" title="采购单明细"  :width="1000" >
            <Table :columns="productcolumns" :data="productdata" border>
              <template slot-scope="{ row, index }" slot="soId">
                <Input v-model="row.soId"></Input></template>
              <template slot-scope="{ row, index }" slot="stockTime">
                <Input v-model="row.stockTime"></Input></template>
              <template slot-scope="{ row, index }" slot="productCode">
                <Input v-model="row.productCode"></Input></template>
              <template slot-scope="{ row, index }" slot="name">
                <Input v-model="row.name"></Input></template>
              <template slot-scope="{ row, index }" slot="stockNum">
                <Input v-model="row.stockNum"></Input></template>
              <template slot-scope="{ row, index }" slot="productTotal">
                <Input v-model="row.productTotal"></Input></template>

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
        {title: "出库单据数", key: "total", align: "center"},
        {title: "产品总数量", key: "totalNum", align: "center"},
        {title: "出库产品总金额",key: "productTotal", align: "center"},
        {title: "操作", slot: "action", align: "center"},
      ],
      //明细
      producmodal:false,
      productdata:[],
      productcolumns: [
        {title: '销售单号',key: 'soId',slot: 'soId',width:150},
        {title: '出库日期',key: 'stockTime',slot: 'stockTime',width:180},
        {title: '产品编号',key: 'productCode',slot: 'productCode',width:120},
        {title: '产品名称',key: 'name',slot: 'name'},
        {title: '产品数',key: 'stockNum',slot: 'stockNum'},
        {title: '产品总金额',key: 'productTotal',slot: 'productTotal'},
      ],
    };
  },
  methods:{
    changeDate(date){this.date=date},
    // 查询
    monthSearch() {
      this.formData=[]
      axios.post("/cgi/main/report/outstock/main?time="+this.date+"&page=1").then((resp) => {
        if(resp.data.total!=0){
          let arr=[]
            arr=resp.data,
            resp.data.productTotal=resp.data.productTotal.toFixed(2)
            this.formData.push(arr)
            this.$Message.success('Success!');
        }else{this.$Message.error('Fail!')}
      });
    },
    search(){
      this.producmodal = true
      axios.post("/cgi/main/report/outstock/main?time="+this.date+"&page=1").then((resp) => {
          this.productdata =resp.data.details.list;
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
