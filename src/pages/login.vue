<template>
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
      @click="reset"
    >
      取消
    </v-btn>

  </v-form>
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
                this.postRequest('/account/user/login', formData).then(resp => {
                  if (resp.code == 200) {
                    this.db.save("USER", resp.data.user);
                    this.db.save("TOKEN", resp.data.token);
                    this.$router.replace('/home');
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