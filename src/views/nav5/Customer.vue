<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom: 1px solid #ccc">
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">客户管理</BreadcrumbItem>
          <BreadcrumbItem to="">客户列表</BreadcrumbItem>
        </Breadcrumb>
      </Header>

      <Content style="margin: 30px 50px">
        <Button type="success" to="/homepage/customer/addcustomer" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px"/>添加</Button >
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="width: 800px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)" >修改</Button >
            <Button type="error" size="small" @click="remove(row)">删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
        <Modal v-model="modal" title="修改数据"  @on-cancel="cancel" @on-ok="handleSubmit" >
          <Form ref="formValidate" label-position="left":model="formValidate" :rules="ruleValidate" :label-width="80" >
          <FormItem label="用户账号" prop="customerCode">
            <Input v-model="formValidate.customerCode" placeholder="Enter your customerCode" class="inps"></Input> 
          </FormItem>
          <FormItem label="用户姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name" class="inps"></Input>
          </FormItem>
          <FormItem label="用户密码" prop="passWord">
            <Input v-model="formValidate.passWord" placeholder="Enter your passWord" class="inps"  ></Input>
          </FormItem>
          <FormItem label="联系人" prop="contactor">
            <Input v-model="formValidate.contactor" placeholder="Enter your contactor" class="inps"  ></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="formValidate.address" placeholder="Enter your address" class="inps"  ></Input>
          </FormItem>
          <FormItem label="邮政编码" prop="postCode">
            <Input v-model="formValidate.postCode" placeholder="Enter your postCode" class="inps"  ></Input>
          </FormItem>
          <FormItem label="电话" prop="tel">
            <Input v-model="formValidate.tel" placeholder="Enter your tel" class="inps"  ></Input>
          </FormItem>
          <FormItem label="传真" prop="fax">
            <Input v-model="formValidate.fax" placeholder="Enter your fax" class="inps"  ></Input>
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
        { title: "客户账号", key: "customerCode" ,width: 100,},
        { title: "用户姓名", key: "name" },
        { title: "客户密码", key: "passWord" },
        { title: "添加日期", key: "createDate", width: 120 },
        { title: "电话",  key: "tel", width: 140 },
        { title: "操作",  key: "action",slot: "action", width: 150, align: "center" },
      ],
      modal: false,
      formValidate: {
        customerCode: "",
        name: "",
        passWord: "",
        contactor:"",
        address:'',
        postCode:'',
        tel:'',
        fax:'',
        createDate: "",
      },
      ruleValidate: {
        customerCode: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        name: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        passWord: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        contactor: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        address: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        postCode: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        tel: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        fax: [{required: true,message: "The name cannot be empty",trigger: "blur",},]
      },
      currentTime: '',
      timer: "",

    };
  },
  mounted(){
    axios.post("/cgi/main/sell/customer/show?page="+1).then((resp) => {
        this.pageData= resp.data;
    })
  },
  methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/sell/customer/show?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },

    //删除
    remove(row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '<p>是否要删除本条数据？</p>',
        onOk: () => {
            axios.post("/cgi/main/sell/customerr/delete?customerCode="+row.customerCode).then((resp) => {
                this.$Message.success('删除成功');})},
        onCancel: () => {this.$Message.info('取消删除');} });
    },
    // 修改
    update(row){
        this.modal = true
        axios.post("/cgi/main/sell/customer/show?customerCode="+row.customerCode).then((resp) => {
              this.formValidate=row
              this.$Message.success("success");})
    },
    handleSubmit() {
          this.formValidate.createDate = this.currentTime;
          axios.post("/cgi/main/sell/customer/update", qs.stringify(this.formValidate))
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
<style scoped >
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
.vertical-center-modal {display: flex;align-items: center;justify-content: center;}
.vertical-center-modal .ivu-modal {top: 0;}
</style>
