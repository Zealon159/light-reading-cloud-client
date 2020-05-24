<template>
  <v-app id="inspire" cols="12" sm="6" offset-sm="3" align="center">
    <v-app-bar
      app
      color="#43a047"
      dark 
      cols="12" 
      src="http://reading.zealon.cn/app-bg-02.jpg"
      elevation="24"
    >
      <template v-slot:img="{ props }" >
        <v-img 
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-btn icon @click="$router.back(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>账户注册</v-toolbar-title>
    </v-app-bar>

    <!-- content -->
    <v-content style="width:900px; text-align:left" >
      <v-container
          fluid
        >
        <v-row >
          <v-col cols="12" sm="12">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              style="padding:20px"
            >
              <v-text-field
                v-model="loginName"
                :counter="10"
                :rules="loginNameRules"
                label="账户"
                required
              ></v-text-field>

              <v-text-field
                v-model="nickName"
                :counter="10"
                :rules="nickNameRules"
                label="昵称"
                required
              ></v-text-field>

              <v-text-field
                v-model="userPwd"
                :rules="userPwdRules"
                type="password"
                label="密码"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="register"
              >
                注册
              </v-btn>

              <v-btn
                color="light"
                class="mr-4"
                @click="$router.back(-1)"
              >
                返回
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            loginName: '',
            loginNameRules: [
                v => !!v || '请输入账户！',
                v => (v && v.length <= 10) || '账户长度不能超过10个字符哦~'
            ],
            nickName: '',
            nickNameRules: [
                v => !!v || '请输入昵称！',
                v => (v && v.length <= 10) || '昵称长度不能超过10个字符哦~'
            ],
            userPwd: '',
            userPwdRules: [
                v => !!v || '请输入密码！'
            ],
            checkbox: false,
        }),
        methods: {
            register () {
              let valid = this.$refs.form.validate();
              if( valid ){
                let formData = {
                  loginName: this.loginName,
                  nickName: this.nickName,
                  userPwd: this.userPwd
                }
                this.postRequest('/account/user/register', formData, {}).then(resp => {
                  if (resp.code == 200) {
                    alert(resp.msg);
                    this.$router.replace('/login');
                  }else{
                    alert(resp.msg);
                  }
                })
              }
            },
            reset () {
              this.$refs.form.reset()
            }
        }
    }
</script>