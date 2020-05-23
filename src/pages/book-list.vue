<template>
  <v-app cols="12" align="center" >
    <v-app-bar
        app
        dark
        color="#43a047"
        cols="12" 
        src="http://reading.zealon.cn/app-bg-02.jpg"
        elevation="24"
        dense
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
        <v-toolbar-title>书单列表</v-toolbar-title>
    </v-app-bar>

    <!-- content -->
    <v-content style="width:900px;">
        <v-container fluid >
          <div v-for="book in books" :key="book.bookId" style="margin-top:15px">
            <v-row no-gutters @click="handleDetails(book.bookId)">
                <v-col cols="4" sm="4">
                <v-img
                    height="125"
                    width="88"
                    :src="book.imgUrl"
                ></v-img>
                </v-col>
                <v-col style=" text-align:left" cols="7" sm="7" >
                <v-row><a>{{book.bookName}}</a></v-row>
                <v-row style="font-size:13px;color:#cccccc; margin-top:6px" >{{book.introduction|subString}}</v-row>
                <v-row style=" margin-top:6px">
                    <span style="font-size:14px;" >{{book.authorName}} </span>
                    <v-spacer ></v-spacer>
                    <v-chip class="ma-2" color="green" label small outlined>
                        {{book.categoryName}}
                    </v-chip>
                </v-row>
                </v-col>
            </v-row>
            <v-divider style="margin-top:12px"></v-divider>
          </div>
          <div style="padding:10px; margin-top:10px">
            <v-btn block color="secondary" :disabled="!showMore" @click="loadBooks()">{{moreText}}</v-btn>
          </div>
        </v-container>
        
    </v-content>
  </v-app>
</template>

<script>
    export default {
        data() {
          return {
            page:1,
            limit:10,
            moreText:'加载更多',
            showMore:true,
            books: []
          };
        },
        created(){
            this.loadBooks();
        },
        methods: {
            // 图书详情
            handleDetails(bookId) {
                this.$router.push('/book-details/'+bookId);
            },
            loadBooks(){
              // 书单列表
              if (this.showMore){
                let booklistId = this.$route.params.id;
                this.getRequest('/index/getBooklistPagingBooks', 
                  {booklistId:booklistId,page:this.page,limit:this.limit}).then(resp => {
                    if (resp.code == 200) {
                      if(resp.data.length > 0){
                        for(let i=0;i<resp.data.length;i++){
                          this.books.push(resp.data[i])
                        }
                        if(resp.data.length<10){
                          // 没有更多
                          this.showMore = false;
                          this.moreText = '到底了啊';
                        }
                      }else{
                        // 没有更多
                        this.showMore = false;
                        this.moreText = '到底了啊';
                      }
                    }
                })
                // 页数加1
                this.page++;
              }
            }
        },
        filters: {
            // 截取字符串
            subString(value) {
                if(value == null){
                    return "";
                }
                if(value.length > 62){
                    return value.substr(0,50)+"...";
                }else{
                    return value;
                }
            },
            titleSubString(value) {
                if(value == null){
                    return "";
                }
                if(value.length > 6){
                    return value.substr(0,6)+"..";
                }else{
                    return value;
                }
            }
        }
    }
</script>