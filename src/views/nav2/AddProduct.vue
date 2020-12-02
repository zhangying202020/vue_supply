<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">产品管理</BreadcrumbItem>
          <BreadcrumbItem to="">产品列表</BreadcrumbItem>
        <BreadcrumbItem to="">产品增加</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="padding:20px;background-color:white" >
        <div style="border-bottom: 1px solid #ccc;margin-bottom:20px"><span class='span'>基本信息</span></div>
        <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80">
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
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">确认保存</Button >
                <Button @click="handleReset('formValidate')" style="margin-left: 8px" >取消</Button>
            </FormItem>
        </Form>
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
  methods: {
    handleSubmit(name) {
      this.formValidate.createDate = this.currentTime;
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post("/cgi/main/sell/product/add", qs.stringify(this.formValidate))
            .then((resp) => {
              this.$router.push('/homepage/productshow')
              this.$Message.success("Success!");
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
#header{text-align: left;height: 40px;line-height: 40px; padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
#layout .inps{width: 240px;padding-right: 20px;}
.span{font-size:16px;font-weight:bolder;border-bottom:2px solid #6495ED;padding-bottom:3px;}
</style>
