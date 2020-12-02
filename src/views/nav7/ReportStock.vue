<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">月度报表</BreadcrumbItem>
          <BreadcrumbItem to="">月度库存情况</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Form ref="formInline" inline>
            <FormItem label="" prop="time" >
              <DatePicker type="month" 
              format="yyyy-MM" @on-change="changeDate" placeholder="Select month" style="width: 200px"></DatePicker>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="monthSearch()">月度库存查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="formData" border style="margin-top: 10px">
          <template slot-scope="{ row, index }" slot="totalNum">
              <span>{{row.totalNum}}</span></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" @click="search()">明细</Button>
          </template>
        </Table>
        <Modal v-model="producmodal" title="库存明细" @on-ok="asyncOK">
            <Table :columns="productcolumns" :data="productdata" border>
              <template slot-scope="{ row, index }" slot="ProductCode">
                <Input v-model="row.ProductCode"></Input></template>
          
            <template slot-scope="{ row, index }" slot="name">
                <Input v-model="row.name"></Input></template>

              <template slot-scope="{ row, index }" slot="num">
                <Input v-model="row.num"></Input></template>
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
        {title: "产品总库数", key: "totalNum",align: "center"},
        {title: "操作", slot: "action", align: "center"},
      ],
      //明细
      producmodal:false,
      productdata:[],
      productcolumns: [
        {title: '产品编号',key: 'ProductCode',slot:"ProductCode"},
        {title: '产品名称',key: 'name',slot:"name"},
        {title: '库存数',key: 'num',slot:"num"},
      ],

    };
  },
  methods:{
    changeDate(date){this.date=date},
    // 查询
    monthSearch() {
      this.formData=[]
      axios.post("/cgi/main/report/stock/main?time="+this.date+"&page=1").then((resp) => {
        if(resp.data.totalNum!=0){
          let arr=[]
            arr=resp.data,
            this.formData.push(arr)
            this.$Message.success('Success!');
        }else{this.$Message.error('Fail!')}
      });
    },
    search(){
      this.producmodal = true
      axios.post("/cgi/main/report/stock/main?time="+this.date+"&page=1").then((resp) => {
            this.productdata =resp.data.details.list;
            this.$Message.success('Success!');
        });
    },
    asyncOK(){console.log(this.productdata);}
    //   const sums = {};
    //   columns.forEach((column, index) => {
    //     key = column.key;
    //     if (index === 0) {
    //       sums[key] = {
    //         key,
    //         value: '总价'
    //       };
    //     return;
    //     }
    //   });
    //   return sums;
    // }
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
