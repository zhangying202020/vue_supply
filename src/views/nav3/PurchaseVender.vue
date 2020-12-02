<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">供应商管理</BreadcrumbItem>
          <BreadcrumbItem to="">供应商列表</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin: 30px 50px">
        <Button type="success" to="/homepage/purchasevender/addvender" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px"/>添加</Button >
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 1000px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal = true" >修改</Button >
            <Button type="error" size="small" @click="remove(row)">删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
        <Modal v-model="modal" title="修改数据"  @on-cancel="cancel" @on-ok="handleSubmit" >
          <Form ref="formValidate" label-position="left":model="formValidate" :rules="ruleValidate" :label-width="80" >
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
        { title: "供应商编号", key: "venderCode",width: 80,},
        { title: "供应商名称", key: "name"},
        {title: "供应商密码",key: "passWord",width: 80,},
        { title: "联系人", key: "contactor",width: 80},
        { title: "地址", key: "address",width: 70},
        { title: "邮政编码", key: "postCode",width: 70},
        {title: "注册日期",key: "createDate",width: 110},
        {title: "电话",key: "tel",width: 100},
        {title: "传真",key: "fax",width: 100},
        { title: "操作", slot: "action", width: 135, align: "center" },
      ],
      modal: false,
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
        contapostCodector: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        tel: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        fax: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
      },
      currentTime: '',
      timer: "",
    }
  },
  mounted() {
    axios.get("/cgi/main/purchase/vender/show?page="+1).then((resp) => {
        this.pageData = resp.data;
      });
  },
    methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/purchase/vender/show?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },

    //删除
    remove(row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '<p>是否要删除本条数据？</p>',
        onOk: () => {
          axios.post("/cgi/main/purchase/vender/delete?venderCode="+row.venderCode).then((resp) => {
            this.$Message.success('删除成功')})},
        onCancel: () => {this.$Message.info('取消删除');}});
    },
    // 修改
    handleSubmit() {
          this.formValidate.createDate = this.currentTime;
          axios.post("/cgi/main/purchase/vender/update", qs.stringify(this.formValidate))
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
  }
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
.vertical-center-modal {display: flex;align-items: center;justify-content: center;}
.vertical-center-modal .ivu-modal {top: 0;}
</style>
