<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">产品管理</BreadcrumbItem>
          <BreadcrumbItem to="">产品分类列表</BreadcrumbItem>
        <BreadcrumbItem to="">添加产品分类</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px;background-color:white" >
        <div style="border-bottom: 1px solid #ccc;margin-bottom:20px"><span class='span'>基本信息</span></div>
        <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="产品分类序号" prop="categoryId">
            <Input v-model="formValidate.categoryId"  placeholder="Enter your categoryId" class="inps"></Input>
            <span style="color:#999">标题不能超过30个字符</span>
          </FormItem>
          <FormItem label="名称" prop="name">
            <Input v-model="formValidate.name"  placeholder="Enter your name" class="inps"></Input>
            <span style="color:#999">多个关键字用,隔开</span>
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
        categoryId: "",
        name: "",
        remark:'',
      },
      ruleValidate: {
        categoryId: [{ required: true,message: "The name cannot be empty",trigger: "blur",},],
        name: [{ required: true,message: "The name cannot be empty",trigger: "blur",},],
        remark: [{ required: true,message: "The name cannot be empty",trigger: "blur",},],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post("/cgi/main/sell/category/add", qs.stringify(this.formValidate)).then((resp) => {
          this.$router.push('/homepage/categoryshow')
          this.$Message.success("Success!");
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {this.$refs[name].resetFields();},
  },
};
</script>
<style scoped>
#header {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
}
#header span:first-of-type {color: #000;font-weight: bolder;}
#layout .inps{width: 240px;padding-right: 20px;}
.span{font-size:16px;font-weight:bolder;border-bottom:2px solid #6495ED;padding-bottom:3px;}
</style>
