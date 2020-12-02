<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="border-bottom:1px solid #ccc" >
        <Breadcrumb separator=">">
          <span>位置:</span>
          <BreadcrumbItem to="/homepage">首页</BreadcrumbItem>
          <BreadcrumbItem to="">产品管理</BreadcrumbItem>
          <BreadcrumbItem to="">产品分类列表</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content style="margin:20px">
        <Button type="success" to="/homepage/categoryshow/addcategory" style="width: 100px" >
          <Icon type="md-add-circle" style="font-size: 20px" />添加</Button >
        <Table ref="currentRowTable" :columns="columns" :data="pageData.list" border style="margin-top: 10px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click=" modal1 = true" >修改</Button >
            <Button type="error" size="small" @click="remove(row)" >删除</Button  >
          </template>
        </Table>
        <Page :total="pageData.total" show-total @on-change="changepage" show-elevator :current="1" ></Page>
        <Modal v-model="modal1" title="修改数据" :closable="false"
           @on-cancel="cancel" @on-ok="handleSubmit" >
          <Form ref="formValidate" label-position="left"
            :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类序列号" prop="categoryId">
              <Input v-model="formValidate.categoryId" placeholder="Enter your categoryId" class="inps" ></Input>
            </FormItem>
            </FormItem>
            <FormItem label="产品类别" prop="name">
              <Input v-model="formValidate.name" placeholder="Enter your name" class="inps" ></Input>
              <span style="color: #999">多个关键字用,隔开</span>
            </FormItem>
            <FormItem label="描述" prop="remark">
              <Input v-model="formValidate.remark" placeholder="Enter your remark" class="inps" ></Input>
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
      modal1: false,
      pageData: [],
      columns: [
        { title: "分类序列号", key: "categoryId" ,width: 100,align: "center"},
        { title: "产品类别名称", key: "name" },
        {title: "描述",key: "remark",},
        { title: "操作",key: "action", slot: "action", width: 150, align: "center" },
      ],
      formValidate: {
        categoryId: "",
        name: "",
        remark: "",
        action: "",
        createDate: "",
      },
      ruleValidate: {
        categoryId: [{required:true,message: "The name cannot be empty",trigger: "blur",},],
        name:      [{required: true,message: "The name cannot be empty",trigger: "blur",},],
        remark:   [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
        action:   [ { required: true, message: "The name cannot be empty", trigger: "blur", }, ],
      },
      currentTime: '',
      timer: "",
    };
  },
  mounted() {
    axios.post("/cgi/main/sell/category/show?page="+1).then((resp) => {
        this.pageData = resp.data;
      });
  },
  methods:{
    //分页
    changepage(page) {
      axios.post("/cgi/main/sell/category/show?page="+page).then((resp) => {
        this.pageData = resp.data;
      })
    },

    //删除
    remove(row) {
      this.$Modal.confirm({
        title: '删除操作',
          content: '<p>是否要删除本条数据？</p>',
            onOk: () => {
              axios.post("/cgi/main/sell/category/delete?categoryId="+row.categoryId).then((resp) => {
                this.$Message.success('删除成功');
                })
            },
            onCancel: () => {
              this.$Message.info('取消删除');
            }
      });
    },
    // 修改
    handleSubmit() {
          axios.post("/cgi/main/sell/category/update", qs.stringify(this.formValidate))
            .then((resp) => {
              this.$Message.success("修改成功");
              this.modal1=false;
            })
    },
    cancel() {
      this.$Message.info('确认取消');
    },
  },
};
</script>
<style scoped>
#header {text-align: left;height: 40px;line-height: 40px;padding: 0 20px;}
#header span:first-of-type {color: #000;font-weight: bolder;}
</style>
