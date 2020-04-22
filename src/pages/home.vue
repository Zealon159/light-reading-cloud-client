<template>
  <v-container
    fluid
  >
    <v-row v-for="item in items" :key="item.id">
      <!-- 书单 -->
      <div v-if="item.itemType==1" class="item">
        <!-- 1.横版(2*3) -->
        <div v-if="item.booklist.style==1">
          
        </div>
        <!-- 2.竖版(1*3) -->
        <v-container v-else-if="item.booklist.style==2" >
            <h3>{{item.booklist.name}}</h3>
          <div v-for="book in item.booklist.books" 
            :key="book.bookId" 
            style="margin-top:15px">
              <v-row no-gutters>
                <v-col cols="3" sm="3">
                  <v-img
                    height="112"
                    width="78"
                    src="http://q94iswz37.bkt.clouddn.com/165314.jpg"
                  ></v-img>
                </v-col>
                <v-col
                  cols="9" sm="9"
                >
                  <div><a>{{book.bookName}}</a></div>
                  <div style="font-size:12px;color:#cccccc">{{book.introduction}}</div>
                  <div>{{book.authorName}}</div>
                </v-col>
              </v-row>
              
            <v-divider style="margin-top:12px"></v-divider>
            
          </div>
        </v-container>
        <!-- 3.1+3本 -->
        <div v-else-if="item.booklist.style==3">

        </div>
        <!-- 4.推荐1本 -->
        <div v-else-if="item.booklist.style==4">

        </div>
      </div>
      <!-- Banner -->
      <v-container v-else-if="item.itemType==2" class="item">
        <v-carousel
          cycle
          height="110"
          hide-delimiter-background
          hide-delimiters
        >
          <v-carousel-item
            v-for="(banner, i) in item.banner.items"
            :key="i"
          >
            <v-sheet
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">{{ banner.imgUrl }} </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'home',
    props: {
      source: String,
    },
    data() {
      return {
        items:[] 
      }
    },
    created() {
      this.initItems();
    },
    methods:{
      initItems(){
        // 初始化主页
        this.getRequest('/index', {type:1,page:1,limit:15}).then(resp => {
          if (resp.code && resp.code == 200) {
            this.items = resp.data;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .item{
    width: 100%;
  }
</style>