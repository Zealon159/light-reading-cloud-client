<template>
  <v-app id="inspire" cols="12" sm="6" offset-sm="3">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <!-- 应用菜单 -->
      <template v-slot:prepend v-if="user">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.headImgUrl">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
            <v-list-item-subtitle @click="commandHandler('logout')">注销</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:prepend v-else >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><span @click="commandHandler('login')">登录</span>
             / 
            <span @click="commandHandler('register')">注册</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense rounded>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="commandHandler('home')">首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="commandHandler('my')">我的</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="commandHandler('about')">关于</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue-grey darken-3"
      dark cols="12" sm="6" offset-sm="3"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>轻松阅读</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      app
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} — <strong>光彩盛年</strong>
        <v-btn icon>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import db from "./utils/sessionStorage"

  export default {
    name: 'light-reading',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      user: db.get("USER")
    }),
    created() {
      document.title = "轻松阅读"
    },
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
            this.$router.push("../home");
        } else if (cmd == 'my'){
            this.$router.push("../my");
        } else if (cmd == 'about'){
            this.$router.push("../about");
        } else if (cmd == 'login'){
            this.$router.push("../login");
        } else if (cmd == 'register'){
            this.$router.push("../register");
        }
      }
    }
  }
</script>

