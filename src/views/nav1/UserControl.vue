<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">用户管理</BreadcrumbItem>
          <BreadcrumbItem to="">用户列表</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Button type="success" to="/homepage/usercontrol/adduser" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px"/>添加</Button >
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 800px; margin-top: 10px">
          <template slot-scope="{ row }" slot="models">
            <span v-for="item in row.models" :key="item.modelCode" >{{ item.modelName }}、</span >
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="updata(row)" >修改</Button >
            <Button type="error" size="small" @click="remove(row)">删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
        <Modal v-model="modal" title="修改数据"  @on-cancel="cancel" @on-ok="handleSubmit" >
          <Form ref="formValidate" label-position="left"
            :model="formValidate" :rules="ruleValidate" :label-width="80" >
            <FormItem label="用户账号" prop="account">
              <Input v-model="formValidate.account" placeholder="Enter your account" class="inps" ></Input>
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
      pageData: [],
      columns: [
        { type: "index", title: "序号", width: 60, align: "center" },
        { title: "用户账号", key: "account" },
        { title: "用户姓名", key: "name" },
        {title: "锁定状态",key: "status",
          render: (h, params) => {if (params.row.status == null) {return h("span", "不锁定");
            } else {return h("span", "锁定");}},
        },
        { title: "添加日期", key: "createDate", width: 120 },
        { title: "用户权限列表",  key: "models",slot: "models", width: 200 },
        { title: "操作",  key: "action",slot: "action", width: 150, align: "center" },
      ],
      modal: false,
      formValidate: {
        account: "",
        name: "",
        passWord: "",
        status: "",
        createDate: "",
        modelcodes: [],
      },
      ruleValidate: {
        account: [{required:true,message: "The name cannot be empty",trigger: "blur",},],
        name: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        passWord: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        status: [ { required: true, message: "Please select gender", trigger: "change", }, ],
        modelcodes: [ { required: true, type: "array", min: 1, message: "Choose at least one hobby", trigger: "change", },
          { type: "array", max: 6, message: "Choose two hobbies at best", trigger: "change", }, ],
      },
      currentTime: '',
      timer: "",

    };
  },
  mounted(){
    axios.post("/cgi/main/system/user/show?page="+1).then((resp) => {
        this.pageData= resp.data;
    })
  },
  methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/system/user/show?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },
    //删除
    remove(row) {
      this.$Modal.confirm({
      title: '删除操作',
      content: '<p>是否要删除本条数据？</p>',
      onOk: () => {
          axios.post("/cgi/main/system/user/delete?account="+row.account).then((resp) => {
            console.log(resp.data);
          this.$Message.success('删除成功');})},
          onCancel: () => {this.$Message.info('取消删除'); }});
    },
    // 修改
    updata(row){
      this.modal = true
      this.formValidate.account=row.account
      this.formValidate.name=row.name
      this.formValidate.passWord=row.passWord
    },
    handleSubmit(row) {
      this.formValidate.createDate = this.currentTime;
      axios.post("/cgi/main/system/user/update", qs.stringify(this.formValidate))
        .then((resp) => {
          console.log(this.formValidate);
          this.$Message.success("success");
            this.modal=false;
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
<style scoped >
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
.vertical-center-modal {display: flex;align-items: center;justify-content: center;}
.vertical-center-modal .ivu-modal {top: 0;}
</style>
