<template>
  <v-app cols="12" sm="6" offset-sm="3" align="center">
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
      <v-toolbar-title>关于</v-toolbar-title>
    </v-app-bar>

    <!-- content -->
    <v-content style="width:900px; text-align:left; margin-top:15px" >
      <v-container
        fluid
      >
         <v-card
            class="mx-auto"
        >
          <v-img src="http://reading.zealon.cn/about-me.png" dark></v-img>

          <v-list two-line>
              <v-list-item >
                  <v-list-item-icon>
                      <v-icon >mdi-github</v-icon>
                  </v-list-item-icon>
                      <v-list-item-content>
                      <v-list-item-title>服务端：
                          <a href="https://github.com/zealon159/light-reading-cloud" target="_blank">
                              https://github.com/zealon159/light-reading-cloud
                          </a>
                      </v-list-item-title>
                      <v-list-item-title>客户端：
                          <a href="https://github.com/zealon159/light-reading-cloud-client" target="_blank">
                              https://github.com/zealon159/light-reading-cloud-client
                          </a>
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>

              <v-list-item >
                  <v-list-item-icon>
                      <v-icon>mdi-information</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <v-list-item-title>本项目是一个微服务实战项目，客户端使用vue.js和vuetify.js实现，服务端核心技术栈使用SpringCloud初代<br/>版本，未来会升级到第二代。</v-list-item-title>
                      <v-list-item-subtitle>本页面实在想不写些什么，那就写写自己工作日常的行为习惯，看看是不是很奇葩呢？</v-list-item-subtitle>
                  </v-list-item-content>
                  
              </v-list-item>

              <v-list-item v-for="(message,i) in messages" :key="i">
                <v-list-item-action></v-list-item-action>
                <v-list-item-content>
                  <v-alert
                    v-model="alert"
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-message-text"
                  >
                    <span style="font-size:14px;color:grey">{{message}}</span>
                  </v-alert>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
    export default {
        data() {
          return {
            alert:'',
            messages:[
              "为什么我天天上下班从不关电脑？想想上次关机应该是去年，关机的原因也是被迫系统更新升级。",
              "为什么大多数开发都2个显示器，我却习惯用笔记本自带的屏幕？",
              "为什么浏览器页签开了十几二十个也不打算尝试关闭一些呢？",
              "为什么我的电脑桌面没有一个应用图标？哦，大概是平时根本看不见桌面吧？",
              "为什么开的所有工具应用从不使用全屏？"
            ]
          };
        }
    }
</script>
