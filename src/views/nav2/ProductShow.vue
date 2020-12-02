<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">用户管理</BreadcrumbItem>
          <BreadcrumbItem to="">用户列表</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Button type="success" to="/homepage/productshow/addproduct" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px" />添加</Button >
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 1000px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click=" modal1 = true" >修改</Button >
            <Button type="error" size="small" @click="remove(row)" >删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>

        <Modal v-model="modal1" title="修改数据" :closable="false"
           @on-cancel="cancel" @on-ok="handleSubmit" >
          <Form ref="formValidate" label-position="left"
            :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="产品编号" prop="productCode">
            <Input v-model="formValidate.productCode"  placeholder="Enter your productCode" class="inps"></Input>
            <span style="color:#999">标题不能超过30个字符</span>
          </FormItem>
          <FormItem label="产品名称" prop="name">
            <Input v-model="formValidate.name"  placeholder="Enter your name" class="inps"></Input>
            <span style="color:#999">多个关键字用,隔开</span>
          </FormItem>
          <FormItem label="数量单位" prop="unitName">
              <Input v-model="formValidate.unitName"  placeholder="Enter your unitName" class="inps" ></Input>
          </FormItem>
          <FormItem label="销售价" prop="price">
            <Input v-model="formValidate.price"  placeholder="Enter your price" class="inps" ></Input>
          </FormItem>
          <FormItem label="分类编号" prop="categoryId" >
            <Select v-model="formValidate.categoryId" placeholder="Select your categoryId" class="inps">
                <Option value="1"></Option>
                <Option value="2"></Option>
                <Option value="3"></Option>
            </Select>
          </FormItem>
            <FormItem label="描述" prop="remark">
                <Input v-model="formValidate.remark"  placeholder="Enter your remark" class="inps" ></Input>
            </FormItem>
          </Form>
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
      modal1: false,
      pageData: [],
      columns: [
        {type: "index", title: "序号", width: 60, align: "center" },
        {title: "产品编号", key: "productCode",width: 100, },
        {title: "产品名称", key: "name",width: 160,},
        {title: "数量单位",key: "unitName", width: 60,},
        {title: "分类名称", key: "categoryId",width: 100},
        {title: "添加日期", key: "createDate",width: 120},
        {title: "销售价",key: "price",width: 80},
        {title: "产品描述",key: "remark",},
        {title: "操作", slot: "action", width: 150, align: "center" },
      ],
      modal: false,
      formValidate: {
        productCode: "",
        name: "",
        unitName:'',
        categoryId:'',
        price:'',
        remark:'',
        createDate:'',
      },
      ruleValidate: {
        productCode: [{ required: true,message: "The name cannot be empty",trigger: "blur",}],
        name: [{ required: true,message: "The name cannot be empty",trigger: "blur",}],
        unitName: [{ required: true,message: "The name cannot be empty",trigger: "blur"}],
        categoryId:[{ required: true, message: 'Please select the categoryId', trigger: 'change' }],
        price: [{ required: true,message: "The name cannot be empty",trigger: "blur"}],
        remark: [{ required: true,message: "The name cannot be empty",trigger: "blur"}],
      },
      currentTime: '',
      timer: "",
    };
  },
  mounted() {
    axios.post("/cgi/main/sell/product/show").then((resp) => {
        this.pageData = resp.data;
      });
  },
    methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/sell/product/show?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },
    //删除
    remove(row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '<p>是否要删除本条数据？</p>',
        onOk: () => {
          axios.post("/cgi/main/sell/product/delete?productCode="+row.productCode).then((resp) => {
            this.$Message.success('删除成功');})},
        onCancel: () => {this.$Message.info('取消删除');}});
    },
    // 修改
    handleSubmit() {
      this.formValidate.createDate = this.currentTime;
      axios.post("/cgi/main/sell/product/update", qs.stringify(this.formValidate))
      .then((resp) => {
            this.$Message.success("success");
            this.modal1=false;
        })
    },
    cancel() {
      this.$Message.info('确认取消');
    },
  },

  created() {
    var _this = this;
    this.timer = setInterval(function () {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();d = d < 10 ? "0" + d : d;
      let h = date.getHours();h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();s = s < 10 ? "0" + s : s;
      let times = y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      _this.currentTime = times;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
.inps{width: 200px;}
</style>
