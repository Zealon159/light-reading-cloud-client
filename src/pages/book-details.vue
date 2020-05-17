<template>
    <v-app cols="12" sm="12" align="center" offset-sm="3">
        <v-app-bar
            app
            color="#43a047"
            dark 
            cols="12" 
            src="http://q94iswz37.bkt.clouddn.com/app-bg-02.jpg"
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
            <v-toolbar-title>{{book.bookName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>分享</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="gotoBookshelf()">
                        <v-list-item-title>进入书架</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>复制链接</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>取消</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- content -->
        <v-content  style="width:900px; text-align:left" >
            <v-container fluid >
                <v-row align="center">
                    <v-col cols="6" sm="6">
                        <v-img
                            height="252"
                            width="180"
                            :src="book.imgUrl"
                        ></v-img>
                    </v-col>
                    <v-col cols="6" sm="6" no-gutters >
                        <v-card-title>{{book.bookName}}</v-card-title>
                        <v-card-text>
                            <v-row style="padding-left:10px">
                                <v-rating
                                    length=5
                                    v-model="book.bookScore"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                                ></v-rating>
                                <div class="red--text ml-4">{{book.bookScore}}分</div>
                            </v-row>
                            <div class="my-4 subtitle-1">
                                作者：{{book.authorName}}
                            </div>
                            <div class="my-4" style="font-size:13px" color="secondary">
                               {{book.wordCount}}万字 | {{book.serialStatusName}}
                            </div>
                            <div>
                                <v-chip small label color="orange" text-color="white" >
                                    {{book.categoryName}}
                                </v-chip>
                            </div>
                        </v-card-text>
                    </v-col>
                    
                    <v-col cols="12" sm="12">
                        <v-divider></v-divider>
                        <v-card-title>简介</v-card-title>
                        <v-card-text>
                            <div>{{book.introduction}}</div>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-container>
            <div style="height:30px">
                <!-- 加入书架提示 -->
                <v-snackbar
                    v-model="snackbar"
                    :timeout="2000"
                    >{{snackbarText}}
                    <v-btn
                        color="blue"
                        text
                        @click="snackbar = false"
                    >
                        关闭
                    </v-btn>
                </v-snackbar>
                <!-- 未登录操作提示 -->
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">提示</v-card-title>
                        <v-card-text>您还没有登录，还不能加入书架哦，是否跳转到登录页面？</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1"  @click="dialog = false">算了</v-btn>
                        <v-btn color="blue darken-1"  @click="gotoLogin()">嗯，去登录</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-content>

        <v-footer
            app
            no-gutters
            >
            <v-bottom-navigation
                color="primary" absolute
                horizontal grow
            >
                <v-btn @click="gotoReading()">
                    <span>开始阅读</span>
                    <v-icon>mdi-read</v-icon>
                </v-btn>
                <v-btn @click="addBookshelf()" :disabled="bookshelfStatus">
                    <span>{{bookshelfText}}</span>
                    <v-icon :color="bookshelfColor">mdi-plus</v-icon>
                </v-btn>
                <v-btn @click="likeSeeClick()">
                    <span>{{likeText}}</span>
                    <v-icon :color="likeColor">mdi-heart</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-footer>
    </v-app>


</template>

<script>
    export default {
        data() {
            return {
                token: this.db.get("TOKEN"),
                dialog: false,
                snackbar: false,
                snackbarText: '已加入书架',
                bookshelfText:'加入书架',
                bookshelfColor:'',
                likeText: '喜欢',
                likeColor: '',
                loading: false,
                chapters:[],
                book: {}
            };
        },
        created(){
            this.initData();
        },
        methods: {
            gotoBookshelf(){
                this.$router.push("/home/my-bookshelf");
            },
            gotoLogin(){
                this.$router.push("/login");
            },
            // 开始阅读
            gotoReading(){
                let bookId = this.$route.params.bookId;
                this.$router.push("/book-read/" + bookId + "/0/0");
            },
            initData(){
                // 详情
                let bookId = this.$route.params.bookId;
                this.getRequest('/book/details', {bookId:bookId}).then(resp => {
                    if (resp.code == 200) {
                        this.book = resp.data;
                    }
                })

                let headers = {
                    "token":this.token
                }
                
                if(this.token){
                    // 检查是否在书架
                    this.getRequest('/account/bookshelf/exist-book', {bookId:bookId}, headers).then(resp => {
                        if (resp.code == 200 && resp.data == 1) {
                            this.bookshelfText = '已在书架';
                            this.bookshelfColor = 'green';
                        }
                    })

                    // 检查是否喜欢
                    this.getRequest('/account/like-see/exist-book', {bookId:bookId}, headers).then(resp => {
                        if (resp.code == 200 && resp.data == 1) {
                            this.likeColor = "red"
                            this.likeText = "已喜欢"
                        }
                    })
                }
            },
            // 加入书架
            addBookshelf(){
                if(!this.token){
                    this.dialog = true;
                    return false;
                }
                if(this.bookshelfColor == "green"){
                    return false;
                }
                let bookId = this.$route.params.bookId;
                let dataForm = {
                    syncType:1,
                    bookId:bookId,
                    lastChapterId:'0'
                }
                let headers = {
                    "token":this.token
                }
                this.postRequest('/account/bookshelf/sync-book', dataForm, headers).then(resp => {
                    if (resp && resp.code==200) {
                        this.snackbar = true;
                        this.bookshelfText = '已在书架';
                        this.bookshelfColor = 'green';
                    }
                })
            },
            // 喜欢看/取消喜欢
            likeSeeClick(){
                if(!this.token){
                    this.dialog = true;
                    return false;
                }
                let value = 1;
                let color = 'red'
                let text = '已喜欢'
                let msg = '加入了已喜欢'
                if(this.likeColor=="red"){
                    color = ''
                    value = 0;
                    text = '喜欢'
                    msg = '取消了已喜欢'
                }
                let bookId = this.$route.params.bookId;
                let dataForm = {
                    bookId: bookId,
                    value: value
                }
                let headers = {
                    "token":this.token
                }
                this.postRequest('/account/like-see/click', dataForm, headers).then(resp => {
                    if (resp && resp.code==200) {
                        this.likeColor = color
                        this.likeText = text
                        this.snackbar = true
                        this.snackbarText = msg
                    }
                })
            }
        }
    }
</script>