<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <Span>位置:</Span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">采购管理</BreadcrumbItem>
          <BreadcrumbItem to="">新添采购单</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin: 30px 20px;border-bottom:none">
        <Form ref="formValidate" id="fromtable" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80" >
          <div>
          <Button type="success" style="width: 100px" @click="add">
            <Icon type="md-add-circle" style="font-size: 20px" />添加明细</Button >
          <Button type="primary" style="width: 100px"  @click="handleSubmit">
            <Icon type="md-albums" style="font-size: 20px" />保存</Button >
          </div>
          <div style="margin-top:10px;padding-left: 10px;">
            <FormItem label="采购单编号" prop="poId"  >
              <Input v-model="formValidate.poId" placeholder="Enter your poId" class="inps" ></Input>
            </FormItem>
            <FormItem label="创建时间" prop="createTime" class="FormItemleft">
              <Input v-model="formValidate.createTime" placeholder="Enter your createTime" class="inps" ></Input>
            </FormItem>
            <FormItem label="供应商编号" prop="venderCode" class="FormItemleft" >
              <Input v-model="formValidate.venderCode" placeholder="Enter your venderCode" class="inps" ></Input>
              <!-- <Icon type="ios-create"  @click="showCode()" style="font-size:30px;position: relative;top:4px"/> -->
            </FormItem>
            </div>
            <div style="padding-left: 10px;">
            <FormItem label="创建用户" prop="account">
              <Input v-model="formValidate.account" placeholder="Enter your account" class="inps" ></Input>
            </FormItem>
            <FormItem label="附加费用" prop="tipFee">
              <Input v-model="formValidate.tipFee" placeholder="Enter your tipFee" class="inps" ></Input>
            </FormItem>
            <FormItem label="产品总价" prop="productTotal">
              <Input v-model="formValidate.productTotal" placeholder="Enter your productTotal" class="inps" ></Input>
            </FormItem>
            </div>
            <div style="padding-left: 10px;">
            <FormItem label="付款方式" prop="payType"  class="inps">
              <Select v-model="formValidate.payType" placeholder="Select your payType">
                  <Option value="1">货到付款</Option>
                  <Option value="2">款到发货</Option>
                  <Option value="3">预付款到发货</Option>
              </Select>
            </FormItem>
            <FormItem label="最低预付款金额" prop="prePayFee" style="margin-left:80px">
              <Input v-model="formValidate.prePayFee" placeholder="Enter your prePayFee" class="inps" ></Input>
            </FormItem>
            <FormItem label="采购产品总价" prop="poTotal">
              <Input v-model="formValidate.poTotal" placeholder="Enter your poTotal" class="inps" ></Input>
            </FormItem>

            </div>
        </Form>
        <!-- 添加明细 -->
        <Table ref="currentRowTable" :columns="columns" :data="formValidate.poitems" border style="width: 1000px; margin-top: 10px">
          <template slot-scope="{ row, index }" slot="productCode" >
            <Input v-model="formValidate.poitems[index].productCode" placeholder="Enter something..." style="width:150px;position: relative;top:15px"></Input>
            <Icon type="ios-create"  @click="showModal(index)" style="font-size:30px;position: relative;right:-150px;top:-17px"/></template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model="formValidate.poitems[index].unitPrice" placeholder="Enter something..." ></Input>
            </template>
          <template slot-scope="{ row, index }" slot="num">
            <Input v-model="formValidate.poitems[index].num" placeholder="Enter something..."></Input></template>
          <template slot-scope="{ row, index }" slot="unitName">
            <Input v-model="formValidate.poitems[index].unitName" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="name">
            <Input v-model="formValidate.poitems[index].name" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="itemPrice">
            <Input v-model="formValidate.poitems[index].itemPrice" placeholder="Enter something..." ></Input></template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="remove()">删除</Button>
          </template>
        </Table>
        <Modal v-model="modal1" title="采购单明细"  :width="630" :height="200" >
            <Table :columns="columns12" :data="productdata" border>
                  <template slot-scope="{ row, index }" slot="choise" >
                      <Button type="error"  @click="SubmitChoise(row)">确定</Button>
                  </template>
            </Table>
            <div slot="footer"></div>
        </Modal>
      </Content>
    </Layout>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
export default {
  name:"addpomain",
  data() {
    return {
      formValidate: {
        poId: "",
        venderCode: "",
        account:JSON.parse(localStorage.getItem("formInline")).username,
        createTime: '',
        tipFee: "10",
        productTotal:"",
        poTotal: "",
        payType:'1',
        prePayFee: "0",
        poitems:[],
        status:"1",
      },
      ruleValidate: {
        poId: [{required:true,message: "The name cannot be empty",trigger: "blur",},],
        venderCode: [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        account: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        createTime: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        tipFee: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        poTotal: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        payType: [ { required: true, message: 'Please select the payType', trigger: 'change' }, ],
        prePayFee: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        productTotal: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        poitems: [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
      },
      currentTime: '',
      timer: "",
      currentRow:'',
      modal1:false,
      //table
      columns: [
        {type: "index", title: "序号", width: 60, align: "center" },
        {title: "产品编号", slot: "productCode",width: 200},
        {title: "产品单价", slot: "price",width: 180},
        {title: "产品数量",slot: "num",width: 180},
        {title: "名称",slot: "name"},
        {title: "数量单位",slot: "unitName"},
        {title: "明细总价", slot: "itemPrice"},
        {title: "操作", slot: "action", width: 140, align: "center"},
      ],
      //添加明细模态框
      productdata:[],
      columns12: [
        {title: '产品编号',key: 'productCode',width:100},
        {title: '产品名称',key: 'name'},
        {title: '数量单位',key: 'unitName'},
        {title: '产品数量',key: 'num'},
        {title: '产品体积',key: 'poNum'},
        {title: '采购单价',key: 'price'},
        {title: '选择',slot: 'choise',width:100},
      ],
    }
  },
  mounted() {
    axios.post("/cgi/main/sell/product/all").then((resp) => {
        this.productdata = resp.data;
      });
  },
  methods:{
    showModal(index){
      this.currentRow=index;
      this.modal1 = true
    },
    add(){
      this.formValidate.poitems.push({
        productCode:"",
        rice:'',
        num:'',
        unitName:'',
        itemPrice:'',
        name:'',
      })
    },
    SubmitChoise(row){
      this.formValidate.poitems[this.currentRow].productCode=row.productCode;
      this.formValidate.poitems[this.currentRow].unitPrice=row.price
      this.formValidate.poitems[this.currentRow].num=row.num
      this.formValidate.poitems[this.currentRow].name=row.name
      this.formValidate.poitems[this.currentRow].unitName=row.unitName
      this.formValidate.poitems[this.currentRow].itemPrice=row.price*row.num
      this.modal1=false
    },
    //删除
    remove() {
      this.$Modal.confirm({
      title: '删除操作',
      content: '<p>是否要删除本条数据？</p>',
        onOk: () => {this.formValidate.poitems.splice(this.currentRow, 1),this.$Message.success('删除成功');},
        onCancel: () => {this.$Message.info('取消删除');}});
    },
    handleSubmit(){
      this.formValidate.createTime=this.currentTime
      this.formValidate.productTotal=this.formValidate.poitems[this.currentRow].itemPrice
      this.formValidate.poitems[this.currentRow].itemPrice=
              parseInt(this.formValidate.poitems[this.currentRow].num)*
              parseInt(this.formValidate.poitems[this.currentRow].unitPrice)  
      this.formValidate.poTotal=
              parseInt(this.formValidate.productTotal)+
              parseInt(this.formValidate.tipFee) 
      axios({
        url: "/cgi/main/purchase/pomain/add",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: this.formValidate,})
        .then((resp) => {
           if (resp.data.code == 2) {
              this.$router.push('/homepage/pomain')
              this.$Message.success('Success!');
          }
      }).catch((error)=>{
        this.$Message.error("Fail!");
      })
    },
  },
    created() {
    var _this = this;
    this.timer = setInterval(function () {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();d = d < 10 ? "0" + d : d;
      let times = y + "-" + MM + "-" + d ;
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
#fromtable>div:nth-of-type(1){border:none;}
#fromtable>div:nth-of-type(2){border-bottom:none;padding-top:20px;height: 55px;}
#fromtable>div:nth-of-type(3){border-top:none;border-bottom:none;height: 55px;}
#fromtable>div:nth-of-type(4){border-top:none;height: 55px;}
.inps{width: 200px;}
#fromtable{width: 950px;}
#fromtable .FormItem{width: 300px;}
#fromtable .FormItemleft{margin-left:0px!important}

.tablelist {border: solid 1px #cbcbcb;width: 100%;min-width:900px;margin-top: 10px;}
.tablelist th {
  height: 34px;
  line-height: 34px;
  border-bottom: solid 1px #b6cad2;
  text-indent: 11px;
  text-align: left;
}
.tablelist td {
  height: 35px;
  line-height: 35px;
  text-indent: 11px;
  border-right: dotted 1px #c7c7c7;
}
.tablelink {
  color: #056dae;
}
.tablelist tbody tr.odd {
    background: #f5f8fa;
}
.tablelist .poinput {
    border: solid 1px #a7b5bc;
    height: 22px;
    line-height: 22px;
    text-indent: 2px;
}
.tablelist span {
    color: #f00;
    font-size: 14px;
    font-weight: bold;
} 
</style>
