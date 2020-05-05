<template>
  <v-app cols="12" sm="6" offset-sm="3" align="center">
    <v-app-bar
      app
      color="#43a047"
      dark 
      cols="12" 
      src="http://q94iswz37.bkt.clouddn.com/app-bg-02.jpg"
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
      <v-toolbar-title>系统登录</v-toolbar-title>
    </v-app-bar>

    <!-- content -->
    <v-content style="width:900px; text-align:left" >
      <v-container
        fluid
      >
        <v-row align="center">
          <v-col cols="12" sm="12">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              
            >
              <v-text-field
                v-model="loginName"
                :counter="10"
                :rules="loginNameRules"
                label="账户"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="密码"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
              >
                登录
              </v-btn>

              <v-btn
                color="light"
                class="mr-4"
                @click="$router.back(-1)"
              >
                取消
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
            password: '',
            passwordRules: [
                v => !!v || '请输入密码！'
            ],
            checkbox: false,
        }),
        methods: {
            login () {
              let valid = this.$refs.form.validate();
              if( valid ){
                let formData = {
                  loginName: this.loginName,
                  password: this.password
                }
                this.postRequest('/account/user/login', formData, {}).then(resp => {
                  if (resp.code == 200) {
                    this.db.save("USER", resp.data.user);
                    this.db.save("TOKEN", resp.data.token);
                    this.$router.replace('/home/index');
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