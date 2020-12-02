<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">用户管理</BreadcrumbItem>
          <BreadcrumbItem to="">添加新用户</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="padding: 30px 50px; background-color: white">
        <div style="border-bottom: 1px solid #ccc; margin-bottom: 20px">
          <span class="span">基本信息</span>
        </div>
        <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80" >
          <FormItem label="用户账号" prop="account">
            <Input  v-model="formValidate.account" placeholder="Enter your account" class="inps" ></Input>
            <span style="color: #999">标题不能超过30个字符</span>
          </FormItem>
          <FormItem label="用户姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name" class="inps" ></Input>
            <span style="color: #999">多个关键字用,隔开</span>
          </FormItem>
          <FormItem label="用户密码" prop="passWord">
            <Input v-model="formValidate.passWord" placeholder="Enter your passWord" class="inps" ></Input>
            <span style="color: #999">默认为用户账号</span>
          </FormItem>
          <FormItem label="锁定状态" prop="status">
            <RadioGroup v-model="formValidate.status">
              <Radio label="1">锁定</Radio>
              <Radio label="0">不锁定</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="权限" prop="modelcodes">
            <CheckboxGroup v-model="formValidate.modelcodes">
              <Checkbox label="1">采购</Checkbox>
              <Checkbox label="2">销售</Checkbox>
              <Checkbox label="3">系统</Checkbox>
              <Checkbox label="4">财务</Checkbox>
              <Checkbox label="5">仓管</Checkbox>
              <Checkbox label="6">业务</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" >确认保存</Button >
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
        account: "",
        name: "",
        passWord: "",
        status: "",
        createDate: "",
        modelcodes: [],
      },
      ruleValidate: {
        account: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        name: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        passWord: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        status: [{required: true,message: "Please select gender",trigger: "change",},],
        modelcodes: [
          {required: true, type: "array",min: 1,message: "Choose at least one hobby",trigger: "change",},
          {type: "array",max: 6,message: "Choose six hobbies at best",trigger: "change",},],
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
          axios.post("/cgi/main/system/user/add", qs.stringify(this.formValidate))
            .then((resp) => {
              this.$router.push('/homepage/usercontrol')
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
  beforeDestroy() {if (this.timer) { clearInterval(this.timer); }},
};
</script>
<style scoped>
#header {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
}
#header span:first-of-type {
  color: #000;
  font-weight: bolder;
}
#layout .inps {
  width: 240px;
  padding-right: 20px;
}
.span {
  font-size: 16px;
  font-weight: bolder;
  border-bottom: 2px solid #6495ed;
  padding-bottom: 3px;
}
</style>
