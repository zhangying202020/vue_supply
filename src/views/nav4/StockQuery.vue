<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">仓库管理</BreadcrumbItem>
          <BreadcrumbItem to="">库存查询</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin: 20px">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem label="" prop="poId" >
                <span>产品编号</span>
                <Input type="text" v-model="formInline.productCode" style="width:150px" ></Input>
            </FormItem>
            <FormItem label="" prop="name" >
                <span>名称</span>
                <Input type="text" v-model="formInline.name" style="width:150px" ></Input>
            </FormItem>
            <FormItem label="" prop="min">
                <span>库存最小量</span>
                <Input type="text" v-model="formInline.min" style="width:60px" ></Input>
            </FormItem>  
            <FormItem label="" prop="max">
                <span>库存最大量</span>
                <Input type="text" v-model="formInline.max" style="width:60px" ></Input>
            </FormItem>  
            <FormItem>
                <Button type="primary" @click="search('formInline')">查询</Button>
            </FormItem>
        </Form>        
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 800px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" @click="alterRecord(row)">库存变更</Button>
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
    formInline: {productCode:'',name :'',min:'',max:''},
    model1: "",
    pageData: [],
    columns: [
        {title: "序号", type: "index", width: 60, align: "center" },
        {title: "产品编号", key:"productCode" ,width: 100,align: "center"},
        {title: "产品名称",key:"name",width: 130},
        {title: "库存数量",key:"num", width: 100, align: "center" },
        {title: "采购",key:"poNum",},
        {title: "卖出",key:"soNum",width:80},
        {title: "价格",key: "price",},
        {title: "数量单位",key:"unitName",},
        {title: "操作",slot: "action",width: 100,},
    ],	
    };
  },
  methods:{
    // 查询
    search(name) {
      this.pageData=[]
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post("/cgi/main/stock/query?page=1",qs.stringify(this.formInline)).then((resp) => {
            if(resp.data.total!=0){
              this.pageData =resp.data;
              this.$Message.success('Success!');
            }else{this.$Message.error('Fail!')}
        });
    } else {this.$Message.error('Fail!');}})},
    //分页
    changepage(page) {
      axios.post("/cgi/main/stock/query?page="+page,qs.stringify(this.formInline)).then((resp) => {
        this.pageData = resp.data;
      })
    },
    alterRecord(row){
      this.$router.push({name:'alterrecord',params:{productCode:row.productCode},})
    }
  }
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
