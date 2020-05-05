<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部工具栏 -->
    <v-footer
      app
      no-gutters
    >
      <v-bottom-navigation
        absolute
        height="60"
        grow
      >
        <v-btn text @click="commandHandler('home')" >
          <span>主页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn text @click="commandHandler('bookshelf')" >
          <span>书架</span>
          <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn text @click="commandHandler('like')" >
          <span>收藏</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </div>
</template>

<script>
  export default {
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
            this.$router.push("/home/index/selected");
        } else if (cmd == 'bookshelf'){
            this.$router.push("/home/my-bookshelf");
        } else if (cmd == 'like'){
            this.$router.push("/home/my-like");
        } else if (cmd == 'about'){
            this.$router.push("/about");
        } else if (cmd == 'login'){
            this.$router.push("/login");
        } else if (cmd == 'register'){
            this.$router.push("/register");
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