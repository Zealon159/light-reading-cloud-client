<template>
    <v-app cols="12" sm="12" align="center" offset-sm="3">
        <v-app-bar app color="#43a047" dark dense cols="12" elevation="24"
            src="http://reading.zealon.cn/app-bg-02.jpg"
        >
            <template v-slot:img="{ props }" >
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
            </template>
            <v-btn icon @click="$router.back(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>{{current.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu left bottom >
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title @click="$router.push('/book-details/'+bookId)">图书详情</v-list-item-title>
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
                <v-row>
                    <v-col cols="12" sm="12">
                        <div class="font-weight-light" style="font-size:18px;line-height:34px;white-space: pre-line;">{{current.content}}</div>
                    </v-col>
                </v-row>
            </v-container>
            <div style="height:30px">
                <!-- 提示 -->
                <v-snackbar v-model="snackbar" :timeout="2000">
                    {{tipText}}
                    <v-btn color="blue" text @click="snackbar = false" >
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
                        <v-btn color="white darken-1"  @click="dialog = false">算了</v-btn>
                        <v-btn color="blue darken-1"  @click="gotoLogin()">嗯，去登录</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
            </div>
            <!-- 目录 -->
            <v-bottom-sheet id="bs" scrollable v-model="sheetCatalog" content-class="content-class">
                <v-card>
                    <v-card-title>目录</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 70%;">
                        <v-list-item v-for="chapter in chapters" :key="chapter.id" style="text-align:left"
                        @click="gotoCustomerChapter(chapter.id)"
                        >
                            <v-list-item-title>{{ chapter.name }}</v-list-item-title>
                        </v-list-item>
                    </v-card-text>
                </v-card>
            </v-bottom-sheet>
        </v-content>

        <v-footer app no-gutters >
            <v-bottom-navigation color="primary" absolute horizontal grow >
                <v-btn @click="gotoPre()">
                    上一章
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn @click="getCatalog()">
                    目录
                    <v-icon>mdi-view-headline</v-icon>
                </v-btn>
                <v-btn @click="gotoNext()">
                    下一章
                    <v-icon>mdi-skip-next</v-icon>
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
                inShelf: 0,
                bookId:'',
                tipText: '',
                dialog: false,
                snackbar: false,
                sheetCatalog: false,
                pre: {},
                current: {},
                next: {},
                loading: false,
                chapters:[]
            };
        },
        created(){
            this.initData();
        },
        methods: {
            // 详情
            initData(){
                this.bookId = this.$route.params.bookId;
                let chapterId = this.$route.params.chapterId;
                this.inShelf = this.$route.params.inShelf;
                this.getChapterInfo(this.bookId, chapterId)
            },
            // 上一章
            gotoPre(){
                if(this.pre == null){
                    this.snackbar = true;
                    this.tipText = "已经是第一章了";
                    return;
                }
                this.getChapterInfo(this.bookId, this.pre.id)
                this.syncBook(this.bookId, this.pre.id)
            },
            // 下一章
            gotoNext(){
                if(this.next == null){
                    this.snackbar = true;
                    this.tipText = "已经是最后一章了";
                    return;
                }
                this.getChapterInfo(this.bookId, this.next.id)
                this.syncBook(this.bookId, this.next.id)
            },
            // 跳转到指定章节
            gotoCustomerChapter(chapterId){
                this.getChapterInfo(this.bookId, chapterId)
                this.sheetCatalog = false
            },
            // 获得章节信息
            getChapterInfo:function(bookId, chapterId){
                this.getRequest('/book/chapter/readChapter', {bookId:bookId, chapterId:chapterId}).then(resp => {
                    if (resp.code == 200) {
                        this.current = resp.data.current;
                        this.pre = resp.data.pre;
                        this.next = resp.data.next;
                    }
                })
            },
            // 获取章节目录
            getCatalog(){
                this.getRequest('/book/chapter/getChapterList', {bookId:this.bookId}).then(resp => {
                    if (resp.code == 200) {
                        this.sheetCatalog = true;
                        this.chapters = resp.data;
                    }
                })
            },
            // 同步图书阅读进度
            syncBook(bookId, chapterId){
                // 只同步在书架里的图书
                if(this.token && this.inShelf == "1"){
                    let dataForm = {
                        syncType: 2,
                        bookId: bookId,
                        lastChapterId: chapterId
                    }
                    let headers = {
                        "token": this.token
                    }
                    this.postRequest('/account/bookshelf/sync-book', dataForm, headers)
                }
            }
        }
    }
</script>

<style scoped>
    .content-class{
        overflow: scroll;
    }
</style>