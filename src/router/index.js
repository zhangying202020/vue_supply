import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/Login.vue'
import error from '@/views/Error.vue'
import homepage from '@/views/Homepage.vue'
import main from '@/views/Main.vue' 
import usercontrol from '@/views/nav1/UserControl.vue'
import adduser from '@/views/nav1/AddUser.vue'
import categoryshow from '@/views/nav2/CategoryShow.vue'
import addcategory from '@/views/nav2/AddCategory.vue'
import productshow from '@/views/nav2/ProductShow.vue'
import addproduct from '@/views/nav2/AddProduct.vue'
import purchasevender from '@/views/nav3/PurchaseVender.vue'
import addvender from '@/views/nav3/AddVender.vue'
import pomain from '@/views/nav3/Pomain.vue'
import addpomain from '@/views/nav3/AddPomain.vue'
import pomainquery from '@/views/nav3/PomainQuery.vue'
import pomainend from '@/views/nav3/PomainEnd.vue'
import instock from '@/views/nav4/Instock.vue'
import outstock from '@/views/nav4/Outstock.vue'
import stocktaking from '@/views/nav4/StockTaking.vue'
import stockquery from '@/views/nav4/StockQuery.vue'
import addstock from '@/views/nav4/AddStock.vue'
import alterrecord from '@/views/nav4/AlterRecord.vue'
import customer from '@/views/nav5/Customer.vue'
import addcustomer from '@/views/nav5/AddCustomer.vue'
import somain from '@/views/nav5/Somain.vue'
import addsomain from '@/views/nav5/AddSomain.vue'
import somainend from '@/views/nav5/SomainEnd.vue'
import somainquery from '@/views/nav5/SomainQuery.vue'
import financequery from '@/views/nav6/FinanceQuery.vue'
import pay from '@/views/nav6/Pay.vue'
import receipt from '@/views/nav6/Receipt.vue'
import reportinstock from '@/views/nav7/ReportInstock.vue'
import reportoutstock from '@/views/nav7/ReportOutstock.vue'
import reportpayment from '@/views/nav7/ReportPayment.vue'
import reportpomain from '@/views/nav7/ReportPomain.vue'
import reportstock from '@/views/nav7/ReportStock.vue'
import reportsomain from '@/views/nav7/ReportSomain.vue'


Vue.use(Router)
const router=new Router({
  routes: [
    {path: '/',name: 'login',component: login},
    {path: '/homepage',name: 'homepage',component: homepage,
    children:[
      {path: 'error',name: 'error',component: error},
      {path: 'main',name: 'main',component: main},
      {path: 'usercontrol',name: 'usercontrol',component: usercontrol},
      {path: 'usercontrol/adduser',name: 'adduser',component: adduser},
      {path: 'categoryshow',name: 'categoryshow',component: categoryshow},
      {path: 'categoryshow/addcategory',name: 'addcategory',component: addcategory},
      {path: 'productshow',name: 'productshow',component: productshow},
      {path: 'productshow/addproduct',name: 'addproduct',component: addproduct},
      {path: 'purchasevender',name: 'purchasevender',component: purchasevender},
      {path: 'purchasevender/addvender',name: 'addvender',component: addvender},
      {path: 'pomain',name: 'pomain',component: pomain},
      {path: 'pomain/addpomain',name: 'addpomain',component: addpomain},
      {path: 'pomainquery',name: 'pomainquery',component: pomainquery},
      {path: 'pomainend',name: 'pomainend',component: pomainend},
      {path: 'instock',name: 'instock',component: instock},
      {path: 'outstock',name: 'outstock',component: outstock},
      {path: 'stockquery',name: 'stockquery',component: stockquery},
      {path: 'stockquery/alterrecord',name: 'alterrecord',component: alterrecord},
      {path: 'stocktaking',name: 'stocktaking',component: stocktaking},
      {path: 'stocktaking/addstock',name: 'addstock',component: addstock},
      {path: 'customer',name: 'customer',component: customer},
      {path: 'customer/addcustomer',name: 'addcustomer',component: addcustomer},
      {path: 'somain',name: 'somain',component: somain},
      {path: 'somain/addsomain',name: 'addsomain',component: addsomain},
      {path: 'somainend',name: 'somainend',component: somainend},
      {path: 'somainquery',name: 'somainquery',component: somainquery},
      {path: 'financequery',name: 'financequery',component: financequery},
      {path: 'pay',name: 'pay',component: pay},
      {path: 'receipt',name: 'receipt',component: receipt},
      {path: 'reportpomain',name: 'reportpomain',component: reportpomain},
      {path: 'reportsomain',name: 'reportsomain',component: reportsomain},
      {path: 'reportinstock',name: 'reportinstock',component: reportinstock},
      {path: 'reportoutstock',name: 'reportoutstock',component: reportoutstock},
      {path: 'reportstock',name: 'reportstock',component: reportstock},
      {path: 'reportpayment',name: 'reportpayment',component: reportpayment},
    ],
  },

]
})
router.beforeEach((to,from,next)=>{
  if(localStorage.getItem("formInline")){
      next()
  }else if(!localStorage.getItem("formInline")&&to.path!='/'){
      next({path:'/'})  
  }else{
      next()
  }
})
export default router;
