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
                            src="https://images-pro.cread.com/211/images/60466920.jpg"
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
                    >已加入书架
                    <v-btn
                        color="blue"
                        text
                        @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
                <!-- 未登录操作提示 -->
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">提示</v-card-title>
                        <v-card-text>您还没有登录，还不能加入书架哦，是否跳转到登录页面？</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1"  @click="dialog = false">取消</v-btn>
                        <v-btn color="blue darken-1"  @click="gotoLogin()">确定</v-btn>
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
                <v-btn>
                    <span>开始阅读</span>
                    <v-icon>mdi-read</v-icon>
                </v-btn>
                <v-btn @click="addBookshelf()" :disabled="bookshelfStatus">
                    <span>加入书架</span>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn>
                    <span>喜欢</span>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-footer>
    </v-app>


</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                snackbar: false,
                bookshelfStatus:false,
                loading: false,
                chapters:[],
                book: {}
            };
        },
        created(){
            this.initData();
        },
        methods: {
            gotoLogin(){
                this.$router.push("/login");
            },gotoBookRead(id){
                this.$router.push("/book/book-read/"+id);
            },
            gotoAuthorDetails(id){
                this.$router.push("/book/author-details/"+id);
            },
            initData(){
                // 详情
                let bookId = this.$route.params.bookId;
                this.getRequest('/book/details', {bookId:bookId}).then(resp => {
                    if (resp.code == 200) {
                        this.book = resp.data;
                    }
                })
            },
            // 加入书架
            addBookshelf(){
                let token = this.db.get("TOKEN")
                if(!token){
                    //alert("请先登录哦");
                    this.dialog = true;
                    return false;
                }
                let bookId = this.$route.params.bookId;
                let dataForm = {
                    syncType:1,
                    bookId:bookId,
                    token:token,
                    lastChapterId:'0'
                }
                let headers = {
                    "token":token
                }
                this.postRequest('/account/bookshelf/sync-book', dataForm, headers).then(resp => {
                    if (resp && resp.code==200) {
                        this.snackbar = true;
                        this.bookshelfStatus = true;
                    }
                })
            }
        }
    }
</script>