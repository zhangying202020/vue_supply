
<template>
  <div class="layout">
    <Layout>
      <Header id="header" style="background: #ccc">
        <div>
          <img src="../../static/images/loginsj.png" />
          <span>欢迎登陆后台管理界面平台</span>
        </div>
        <div>
          <span><a>帮助</a></span>
          <span><a>关于</a></span>
        </div>
      </Header>
      <Content id="content">
        <vue-particles color="#dedede" linesColor="#d22333"></vue-particles>
        <Form
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          id="form"
        >
          <FormItem prop="user">
            <Input type="text" v-model="formInline.username"
              placeholder="Username"
              class="input"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="Password"
              class="input"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit">登陆</Button>
            <Checkbox v-model="single">记住密码</Checkbox>
            <span>忘记密码?</span>
          </FormItem>
        </Form>
      </Content>
      <Footer style="text-align: center; padding: 10px">版权所有</Footer>
    </Layout>
  </div>
</template>

<script>
import qs from 'qs'
import axios from "axios";
export default {
  data() {
    return {
      single: false,
      formInline: {
        username: "",
        password: "",
      },
      member:'member',
      ruleInline: {
        username: [{required: true,message: "Please fill in the user name",trigger: "blur",},],
        // password: [{ required: true,message: "Please fill in the password.",trigger: "blur",},
          // {type: "string",min: 6,message: "The password length cannot be less than 6 bits",trigger: "blur",},
          // ],
      },
    };
  },
  methods: {
    handleSubmit() {
      let d = {username:this.formInline.username,password:this.formInline.password,role:this.member};
      localStorage.setItem("formInline", JSON.stringify(this.formInline));
      axios.post("/cgi/sys/login",qs.stringify(d)).then((resp) => {
        if (resp.data.code == 2) {
            this.$router.push('/homepage');
            } else {
              this.$Message.error("Fail!");
            }
      });
    },
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
#header {
  display: flex;
  justify-content: space-between;
}
#content {
  width: 100%;
  height: 540px;
  background-image: url(../../static/images/logininfo.png);
  background-repeat: no-repeat;
  background-position: 50% 50px;
}
#form {
  width: 280px;
  position: relative;
  top: 150px;
  left: 45%;
}
.input {
  width: 300px;
}
</style>

