<template>
  <div class="layout">
    <Layout id="layout">
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">库存管理</BreadcrumbItem>
          <BreadcrumbItem to="">库存盘点</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="padding:20px; background-color: white">
        <div style="border-bottom: 1px solid #ccc; margin-bottom: 20px">
          <span class="span">基本信息</span>
        </div>
        <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <FormItem label="当前库存" prop="num">
            <Input  v-model="formValidate.num" placeholder="Enter your..." class="inps" ></Input>
          </FormItem>
          <!-- <FormItem label="变化数量" prop="num">
            <Input  v-model="formValidate.num" placeholder="Enter your..." class="inps" ></Input>
            <span style="color: #999">标题不能超过30个字符</span>
          </FormItem> -->
          <FormItem label="变化类型" prop="type">
                <Select v-model="formValidate.type" style="width:200px">
                    <Option value="1">损耗</Option>
                    <Option value="2">盘余</Option>
                </Select>
          </FormItem>
          <FormItem label="损益原因" prop="description">
            <Input v-model="formValidate.description" placeholder="Enter your..." class="inps" ></Input>
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
        model:'',
        formValidate: {
            productCode:'',
            originNum:'',
            num: "",
            description: "",
            type: '',
        },
        ruleValidate: {
            num: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
            description: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
            type: [{required: true,message: "Please select gender",trigger: "change",},],
        },
    };
  },
  mounted() {
    this.formValidate.productCode=this.$route.params.productCode;
    this.formValidate.originNum=this.$route.params.originNum;
  },
  methods: {
    handleSubmit(name) {
        this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post("/cgi/main/stock/checkstock", qs.stringify(this.formValidate))
            .then((resp) => {
              this.$router.push('/homepage/stocktaking')
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
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
#layout .inps {width: 240px;padding-right: 20px;}
.span {font-size: 16px;font-weight: bolder;border-bottom: 2px solid #6495ed;padding-bottom: 3px;}
</style>
