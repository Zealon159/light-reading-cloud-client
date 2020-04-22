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
      v-model="nickName"
      :counter="10"
      :rules="nickNameRules"
      label="昵称"
      required
    ></v-text-field>

    <v-text-field
      v-model="userPwd"
      :rules="userPwdRules"
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
                this.postRequest('/account/user/register', formData).then(resp => {
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