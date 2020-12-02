<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <Span>位置:</Span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">采购管理</BreadcrumbItem>
          <BreadcrumbItem to="">添加采购单</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="padding: 30px 50px;background-color:white" >
            <Button type="primary"  @click="addchoise()">确认</Button >
            <Button @click="cancel" style="margin-left: 8px">取消</Button><br>
            <RadioGroup v-model="product">
                <Table ref="selection" border :columns="columns1" :data="data1" style="margin-top:10px;width:600px">
                    <template slot-scope="{ row, index }" slot="choise" >
                        <Radio :label="JSON.stringify(row)" style="color:white;" ></Radio>
                    </template>
                </Table>
            </RadioGroup>
            <Page :total="data1.length" show-total @on-change="changepage" show-elevator :current="1" ></Page>
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
      columns1: [
            {title: '选择',slot: 'choise',width:100},
            {title: '产品编号',key: 'productCode',width:100},
            {title: '产品名称',key: 'name'},
            {title: '数量单位',key: 'unitName'},
            {title: '产品数量',key: 'num'},
            {title: '产品体积',key: 'poNum'},
            {title: '采购单价',key: 'price'},
        ],
        data1: [],  
        product:'',
    };
  },
  mounted() {
        axios.get("/cgi/main/sell/product/all").then((resp) => {
            this.data1 = resp.data;
      });
  },
  methods: {
    changepage(page) {
      axios.post("/cgi/main/sell/product/all?page="+page).then((resp) => {
        this.data1 = resp.data;
      })
    },
    addchoise(){
      let pros=JSON.parse(this.product);
      console.log(pros);
      
      this.$router.push({name:'addpomain', params:{docId:pros}})
    },

    cancel(){
      
    }
  },
};
</script>
<style scoped>
#header { text-align: left; height: 40px; line-height: 40px; padding: 0 20px; }
#header span:first-of-type {  color: #000; font-weight: bolder; }
#layout .inps{width: 240px;padding-right: 10px;}
.span{ font-size:16px; font-weight:bolder; border-bottom:2px solid #6495ED; padding-bottom:3px;}
</style>
