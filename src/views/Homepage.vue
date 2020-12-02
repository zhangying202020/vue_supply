<template>
  <Layout>
    <Header id="top">
      <div id="header">
        <div class="topleft">
          <img src="../../static/images/loginlogo.png" />
        </div>
        <div class="topright">
          <img src="../../static/images/topright.jpg" />
        </div>
      </div>
      <div class="time">
        <span><Icon type="md-person" class="icon" />{{ username }}
          <Icon type="md-clock" class="icon" />系统时间:<datatime class="nowTime"></datatime>
        </span>
      </div>
    </Header>
    <Layout>
      <Sider hide-trigger >
        <Menu active-name="1-2" :open-names="['1']" accordion style="width:200px">
          <MenuItem name="1" style="background-color: #3f97c9; color: white;">
            <Icon type="md-arrow-dropdown-circle" />菜单管理</MenuItem>
          <Submenu name="2" >
            <template slot="title"><Icon type="ios-analytics" />管理信息</template>
            <MenuItem name="1-1" to="/homepage/main">首页</MenuItem>
            <MenuItem name="1-2" to="/homepage/usercontrol">用户管理</MenuItem>
            <MenuItem name="1-3" to="/" @click.native="loginOut">退出</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title"><Icon type="ios-analytics" />产品管理</template>
            <MenuItem name="1-1" to="/homepage/categoryshow">产品分类列表</MenuItem>
            <MenuItem name="1-2" to="/homepage/productshow">产品列表</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title"><Icon type="ios-analytics" />采购管理</template>
            <MenuItem name="1-1" to="/homepage/purchasevender">供应商管理</MenuItem>
            <MenuItem name="1-2" to="/homepage/pomain">新添采购单</MenuItem>
            <MenuItem name="1-3" to="/homepage/pomainend">采购单了结</MenuItem>
            <MenuItem name="1-4" to="/homepage/pomainquery">采购单查询</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title"><Icon type="ios-analytics" />仓库管理</template>
            <MenuItem name="1-1" to="/homepage/instock">入库登记</MenuItem>
            <MenuItem name="1-2" to="/homepage/outstock">出库登记</MenuItem>
            <MenuItem name="1-3" to="/homepage/stockquery">库存查询</MenuItem>
            <MenuItem name="1-4" to="/homepage/stocktaking">库存盘点</MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title"><Icon type="ios-analytics" />销售管理</template>
            <MenuItem name="1-1" to="/homepage/customer">客户管理</MenuItem>
            <MenuItem name="1-2" to="/homepage/somain">新添销售单</MenuItem>
            <MenuItem name="1-3" to="/homepage/somainend">销售单了结</MenuItem>
            <MenuItem name="1-4" to="/homepage/somainquery">销售单查询</MenuItem>
          </Submenu>
          <Submenu name="7">
            <template slot="title"><Icon type="ios-analytics" />财务收支</template>
            <MenuItem name="1-1" to="/homepage/receipt">收款登记</MenuItem>
            <MenuItem name="1-2" to="/homepage/pay">付款登记</MenuItem>
            <MenuItem name="1-3" to="/homepage/financequery">收支查询</MenuItem>
          </Submenu>
          <Submenu name="8">
            <template slot="title"><Icon type="ios-analytics"/>月度报表</template>
            <MenuItem name="1-1" to="/homepage/reportpomain">月度采购报表</MenuItem>
            <MenuItem name="1-2" to="/homepage/reportsomain">月度销售报表</MenuItem>
            <MenuItem name="1-3" to="/homepage/reportoutstock">月度出库报表</MenuItem>
            <MenuItem name="1-4" to="/homepage/reportinstock">月度入库报表</MenuItem>
            <MenuItem name="1-5" to="/homepage/reportstock">月度库存报表</MenuItem>
            <MenuItem name="1-6" to="/homepage/reportpayment">月度收支报表</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content><router-view></router-view></Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import datatime from "@/views/Nowtime.vue";
import axios from "axios";
export default {
  components: { datatime },
  data() {
    return {
      theme3: "",
      username: JSON.parse(localStorage.getItem("formInline")).username,
    };
  },
  methods: {
    loginOut(){
        axios.get("/cgi/sys/logout").then((resp) => {
          if(resp.data.code==2){
            window.localStorage.removeItem('formInline')
          }
        })
    }
  }
};
</script>
<style scoped>
#top {padding: 0;height: 80px;line-height: 80px;}
#header {display: flex;justify-content: space-between;background-image: url(../../static/images/topbg.gif);}
.topleft {width: 100%;background-image: url(../../static/images/topleft.jpg);background-repeat: no-repeat;}
.topleft img {position: relative;top: 10px;left: 10px;}
.time {float: right;width: 315px;height: 30px;border-radius: 20px;margin-right: 20px;
  background-color: #045381;position: relative;top: -90px;}
.time span {position: relative;top: -25px;left: 18px;color: white;}
.icon,.time span { margin-right: 10px;}
.icon { font-size: 20px;}
.nowTime {clear: left;float: right;position: relative;right: 40px;color: white;}
</style>
