<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">采购管理</BreadcrumbItem>
          <BreadcrumbItem to="">供应商列表</BreadcrumbItem>
          <BreadcrumbItem to="">添加供应商</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="padding: 30px 50px;background-color:white" >
        <div style="border-bottom: 1px solid #ccc;margin-bottom:20px"><span class='span'>基本信息</span></div>
        <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="供应商编号" prop="venderCode">
              <Input v-model="formValidate.venderCode" placeholder="Enter your venderCode" class="inps" ></Input>
              <span style="color: #999">4~20位数字字母</span>
            </FormItem>
            <FormItem label="供应商名称" prop="name">
              <Input v-model="formValidate.name" placeholder="Enter your name" class="inps" ></Input>
              <span style="color: #999">长度不超过100</span>
            </FormItem>
            <FormItem label="用户密码" prop="passWord">
              <Input v-model="formValidate.passWord" placeholder="Enter your passWord" class="inps" ></Input>
            </FormItem>
            <FormItem label="联系人" prop="contactor">
              <Input v-model="formValidate.contactor" placeholder="Enter your contactor" class="inps" ></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="formValidate.address" placeholder="Enter your address" class="inps" ></Input>
            </FormItem>
            <FormItem label="邮政编码" prop="postCode">
              <Input v-model="formValidate.postCode" placeholder="Enter your postCode" class="inps" ></Input>
            </FormItem>
            <FormItem label="电话" prop="tel">
              <Input v-model="formValidate.tel" placeholder="Enter your tel" class="inps" ></Input>
            </FormItem>
            <FormItem label="传真" prop="fax">
              <Input v-model="formValidate.fax" placeholder="Enter your fax" class="inps" ></Input>
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
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        tel: "",
        fax:"",
        createDate: "",
      },
      ruleValidate: {
        venderCode: [{required:true,message: "The name cannot be empty",trigger: "blur",},],
        name: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        passWord: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        contactor: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        address: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        postCode: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        contapostCodector: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        tel: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        fax: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
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
          axios.post("/cgi/main/purchase/vender/add", qs.stringify(this.formValidate)).then((resp) => {
          this.$router.push('/homepage/purchasevender')
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
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<style scoped>
#header { text-align: left; height: 40px; line-height: 40px; padding: 0 20px; }
#header span:first-of-type {  color: #000; font-weight: bolder; }
#layout .inps{width: 240px;padding-right: 10px;}
.span{ font-size:16px; font-weight:bolder; border-bottom:2px solid #6495ED; padding-bottom:3px;}
</style>
