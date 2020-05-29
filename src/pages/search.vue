<template>
  <v-app cols="12" align="center">
    <v-app-bar
      app
      color="#43a047"
      dark 
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
      <v-btn icon @click="$router.push('/index')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>搜索</v-toolbar-title>
    </v-app-bar>

    <!-- content -->
    <v-content style="width:900px;" >
        <v-container  >
            <v-row>
                <v-col style="text-align:left" cols=12>
                    <v-text-field light label="书名/作者/支持拼音哦" dense 
                        :autofocus="focus"
                        v-model="keyword"
                        single-line full-width clearable solo
                        prepend-inner-icon="mdi-pencil"
                        :append-outer-icon="keyword ? 'mdi-magnify' : ''"
                        @click:append-outer="searchBooks"
                        @keyup.enter.native="searchBooks"
                    ></v-text-field>
                    <div >
                        大家都在搜：
                        <v-chip label color="light-blue lighten-5" class="ma-2" @click="searchHotWordBooks(word)"
                            v-for="word in hotWords" :key="word">
                            {{word}}
                        </v-chip>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <div v-for="book in books" :key="book.bookId" style="margin-top:15px; width:100%">
                    <v-row no-gutters @click="handleDetails(book.bookId)">
                        <v-col cols="4" sm="4">
                            <v-img
                                height="132"
                                width="96"
                                :src="book.imgUrl"
                            ></v-img>
                        </v-col>
                        <v-col cols="7" sm="7">
                            <v-row >
                                <a>{{book.bookName}}</a>
                                <v-spacer></v-spacer>
                                <v-rating
                                    length=5
                                    v-model="book.bookScore"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size=14
                                ></v-rating>
                                <div class="red--text ml-2" style="margin-right:10px">{{book.bookScore}}分</div>
                            </v-row>
                            <v-row>
                                <v-btn text style="margin:0px; padding:0px" >
                                    <v-icon left>mdi-account-outline</v-icon>
                                    {{book.author}}
                                </v-btn>
                            </v-row>
                            <v-row style="font-size:13px;color:gray; margin-top:6px; text-align:left" >{{book.introduction|subString}}</v-row>
                        </v-col>
                    </v-row>
                    <v-divider style="margin-top:12px"></v-divider>
                </div>
                <div style="padding:10px; margin-top:10px; width:100%">
                    <v-btn block color="blue lighten-5" v-show="showMoreBtn"
                    :disabled="!showMore" @click="loadMore()">{{moreText}}</v-btn>
                </div>
            </v-row>
        </v-container>
    </v-content>
  </v-app>
</template>
<script>
    export default {
        data() {
          return {
            alert:'',
            focus:true,
            keyword:'',
            hotWords:{},
            books:[],
            page:1,
            limit:6,
            moreText:'加载更多',
            showMore:false,
            showMoreBtn:false
          };
        },
        created(){
            this.loadHotWords();
        },
        methods: {
            loadHotWords(){
                this.getRequest('/index/getHotSearchWords', {size: 6}).then(resp => {
                    if (resp.code == 200) {
                        this.hotWords = resp.data;
                    }
                })
            },
            searchBooks(reload){
                this.showMoreBtn = true
                // 重新加载
                if(reload){
                    this.books = [];
                }
                this.getRequest('/index/searchBooks', 
                    {keyword: this.keyword, page: this.page, limit: this.limit}).then(resp => {
                    if (resp.code == 200) {
                        if(resp.data.bookList.length > 0){
                            for(let i=0; i < resp.data.bookList.length; i++){
                                this.books.push(resp.data.bookList[i])
                            }
                            if(resp.data.bookList.length < this.limit){
                                // 没有更多
                                this.showMore = false;
                                this.moreText = '到底了啊';
                            }else{
                                this.showMore = true;
                                this.moreText = '加载更多';
                            }
                        }else{
                            // 没有更多
                            this.showMore = false;
                            this.moreText = '到底了啊';
                        }
                    }
                })
            },
            // 点击热搜词进行搜索
            searchHotWordBooks(val){
                this.page = 1;
                this.keyword = val;
                this.searchBooks(true);
            },
            // 加载更多
            loadMore(){
                this.page++;
                this.searchBooks(false);
            },
            // 图书详情
            handleDetails(bookId) {
                this.$router.push('/book-details/'+bookId);
            },
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
