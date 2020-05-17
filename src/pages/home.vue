<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部工具栏 -->
    <v-footer app no-gutters >
      <v-bottom-navigation absolute height="60" grow >
        <v-btn text @click="commandHandler('home')" >
          <span>主页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn text @click="commandHandler('bookshelf')" >
          <span>书架</span>
          <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn text @click="commandHandler('like')" >
          <span>喜欢</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>

    <!-- 未登录操作提示 -->
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">提示</v-card-title>
            <v-card-text>您还没有登录，还不能使用该功能，是否跳转到登录页面？</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="white darken-1"  @click="dialog = false">算了</v-btn>
            <v-btn color="blue darken-1"  @click="commandHandler('login')">嗯，去登录</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        token: this.db.get("TOKEN"),
      };
    },
    name: 'app',
    methods:{
      commandHandler(cmd) {
        // 退出登录
        if (cmd == 'logout') {
          if(confirm("此操作将注销登录, 是否继续?")){
            this.db.remove("USER")
            this.db.remove("TOKEN")
            this.$router.replace("/login");
          }
        } else if (cmd == 'home'){
            this.$router.push("/home/index");
        } else if (cmd == 'bookshelf'){
          if(!this.token){
            this.dialog = true;
            return false;
          }
          this.$router.push("/home/my-bookshelf");
        } else if (cmd == 'like'){
          if(!this.token){
            this.dialog = true;
            return false;
          }
          this.$router.push("/home/my-like");
        } else if (cmd == 'login'){
          this.$router.push("/login"); 
        }
      }
    }
  }
</script>

<style scoped>
  .buttom-btn{
     margin-top:8px
  }
</style>