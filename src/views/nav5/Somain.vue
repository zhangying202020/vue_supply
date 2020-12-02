<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">销售管理</BreadcrumbItem>
          <BreadcrumbItem to="">新添销售单</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Button type="success" to="/homepage/somain/addsomain" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px"/>添加</Button >
        <Table ref="currentRowTable" :columns="columns1" :data="pageData.list" border style="width: 970px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="update(row)" >修改</Button >
            <Button type="error" size="small" @click="remove(row)">删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
        <Modal v-model="modal" title="修改数据" fullscreen @on-cancel="cancel" @on-ok="handleSubmit">
        <Form ref="formValidate" id="fromtable" label-position="left" :model="formArr" :rules="ruleArr" :label-width="80" >
          <div style="margin-top:10px;padding-left: 10px;">
            <FormItem label="销售单编号" prop="soId"  >
              <Input v-model="formArr.soId" placeholder="Enter your soId" class="inps" ></Input>
            </FormItem>
            <FormItem label="创建时间" prop="createTime" class="FormItemleft">
              <Input v-model="formArr.createTime" placeholder="Enter your createTime" class="inps" ></Input>
            </FormItem>
            <FormItem label="客户编号" prop="customerCode" class="FormItemleft" >
              <Input v-model="formArr.customerCode" placeholder="Enter your customerCode" class="inps" ></Input>
            </FormItem>
            </div>
            <div style="padding-left: 10px;">
            <FormItem label="创建用户" prop="account">
              <Input v-model="formArr.account" placeholder="Enter your account" class="inps" ></Input>
            </FormItem>
            <FormItem label="附加费用" prop="tipFee">
              <Input v-model="formArr.tipFee" placeholder="Enter your tipFee" class="inps" ></Input>
            </FormItem>
            <FormItem label="产品总价" prop="productTotal">
              <Input v-model="formArr.productTotal" placeholder="Enter your productTotal" class="inps" ></Input>
            </FormItem>
            </div>
            <div style="padding-left: 10px;">
            <FormItem label="付款方式" prop="payType"  class="inps">
              <Select v-model="formArr.payType" placeholder="Select your payType">
                  <Option value="1">货到付款</Option>
                  <Option value="2">款到发货</Option>
                  <Option value="3">预付款到发货</Option>
              </Select>
            </FormItem>
            <FormItem label="最低预付款金额" prop="prePayFee" style="margin-left:80px">
              <Input v-model="formArr.prePayFee" placeholder="Enter your prePayFee" class="inps" ></Input>
            </FormItem>
            <FormItem label="销售产品总价" prop="soTotal">
              <Input v-model="formArr.soTotal" placeholder="Enter your soTotal" class="inps" ></Input>
            </FormItem>
            </div>
            <div style="padding-left: 10px;">
            <FormItem label="备注" prop="remark">
              <Input v-model="formArr.remark" placeholder="Enter your remark" class="inps" ></Input>
            </FormItem>
            </div>
        </Form>
        <!-- 添加明细 -->
        <Table ref="currentRowTable" :columns="columns" :data="formArr.soitems" border style="width: 1000px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="productCode" >
            <Input v-model="formArr.soitems[index].productCode" placeholder="Enter something..." ></Input>
            </template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model="formArr.soitems[index].unitPrice" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="num">
            <Input v-model="formArr.soitems[index].num" placeholder="Enter something..."></Input></template>
          <template slot-scope="{ row, index }" slot="unitName">
            <Input v-model="formArr.soitems[index].unitName" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="itemPrice">
            <Input v-model="formArr.soitems[index].itemPrice" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="remove(row,index)">删除</Button>
          </template>
        </Table>
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
      columns1: [
        {type: "index", title: "序号", width: 55, align: "center",classHeader: 'HeaderStyle', },
        {title: "销售单编号", key: "soId",width: 150,classHeader: 'HeaderStyle',},
        {title: "客户编号", key: "customerCode",width: 80,classHeader: 'HeaderStyle',},
        {title: "创建用户",key: "account",width: 70,classHeader: 'HeaderStyle',},
        {title: "创建时间",key: "createTime",width: 105,classHeader: 'HeaderStyle',},
        {title: "附加费用",key: "tipFee",width: 55,classHeader: 'HeaderStyle',},
        {title: "产品总价", key: "productTotal",width: 80,classHeader: 'HeaderStyle',},
        {title: "销售单总价", key: "soTotal",width: 80,classHeader: 'HeaderStyle',},
        {title: "付款方式", key: "payType",width: 50,classHeader: 'HeaderStyle',},
        {title: "采购单状态", key: "status",width: 50,classHeader: 'HeaderStyle',},
        {title: "备注", key: "remark",width: 53,classHeader: 'HeaderStyle',},
        {title: "操作", slot: "action", width: 140, align: "center",classHeader: 'HeaderStyle',},
        // {title: "最低预付款金额", key: "prePayFee ",width: 50,classHeader: 'HeaderStyle',},
        // {title: "采购单明细", key: "poitems", slot: "poitems",classHeader: 'HeaderStyle',},
      ],
      currentTime: '',
      timer: "",
      modal: false,
      formArr: {
        soId: "",
        venderCode: "",
        account:"",
        createTime: '',
        tipFee: "",
        productTotal:"",
        soTotal: "",
        payType:'',
        prePayFee: "",
        status:"1",
        soitems:[{
          productCode:'',
          unitPrice:'',
          num:'',
          unitName:'',
          itemPrice:'',
      }],
      },
      ruleArr: {
        soId: [{required:true,message: "The name cannot be empty",trigger: "blur",},],
        venderCode: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        account: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        createTime: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        tipFee: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        soTotal: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        payType: [ { required: true, message: 'Please select the payType', trigger: 'change' }, ],
        prePayFee: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        productTotal: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        poitems: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
      },
      currentRow:'',
      arr:'',
      modal1:false,
      //table
      columns: [
        {type: "index", title: "序号", width: 60, align: "center" },
        {title: "产品编号", slot: "productCode",width: 200},
        {title: "产品单价", slot: "price",width: 180},
        {title: "产品数量",slot: "num",width: 180},
        {title: "数量单位",slot: "unitName"},
        {title: "明细总价", slot: "itemPrice"},
        {title: "操作", slot: "action", width: 140, align: "center"},
      ],
    }
  },
  mounted() {
    axios.get("/cgi/main/sell/somain/show?type="+1+"&page="+1).then((resp) => {
        this.pageData = resp.data;
        });
  },
    methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/sell/somain/show?type="+1+"&page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },
    //删除
    remove(row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '<p>是否要删除本条数据？</p>',
        onOk: () => {
          axios.post("/cgi/main/sell/somain/delete?soId="+row.soId).then((resp) => {
            this.$Message.success('删除成功');})},
        onCancel: () => {this.$Message.info('取消删除');}});
    },
    // 修改
    update(row){
      this.modal = true
      axios.post("/cgi/main/sell/somain/queryItem?soId="+row.soId).then((resp) => {
        this.formArr=row
        this.formArr.soitems=resp.data
      });
    },
    //删除
    remove(index) {
      this.$Modal.confirm({
      title: '删除操作',
      content: '<p>是否要删除本条数据？</p>',
        onOk: () => {this.formArr.soitems.splice(index, 1),this.$Message.success('删除成功');},
        onCancel: () => {this.$Message.info('取消删除');}});
    },
    //保存
    handleSubmit(){
        this.formArr.soTotal=
            parseInt(this.formArr.tipFee)+
            parseInt(this.formArr.productTotal)+
            parseInt(this.formArr.prePayFee)
      axios({
        url: "/cgi/main/sell/somain/update",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: this.formArr,})
        .then((resp) => {
          if (resp.data.code == 2) {
              this.$Message.success('Success!');
          }
      }).catch((error)=>{
        this.$Message.error("Fail!");
      })
    },
    cancel() {this.$Message.info('确认取消');},

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
#fromtable>div{display: flex;align-items: center;gap: 10px;border: 1px solid #ccc;}
#fromtable>div:nth-of-type(){border:none;}
#fromtable>div{height: 55px;}
#fromtable>div:nth-of-type(1){border-bottom:none;padding-top:20px;}
#fromtable>div:nth-of-type(2),#fromtable>div:nth-of-type(3){border-top:none;border-bottom:none;padding-top:20px;}
#fromtable>div:nth-of-type(4){border-top:none;padding-top:20px;}
.inps{width: 200px;}
#fromtable{width: 900px;}
#fromtable .FormItem{width: 300px;}
#fromtable .FormItemleft{margin-left:0px!important}

</style>
