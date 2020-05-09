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
                        <v-list-item-title>图书详情</v-list-item-title>
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
                        <div class="font-weight-light" style="font-size:18px;line-height:34px">{{current.content}}</div>
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
        </v-content>

        <v-footer app no-gutters >
            <v-bottom-navigation color="primary" absolute horizontal grow >
                <v-btn @click="gotoPre()">
                    上一章
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn @click="addBookshelf()">
                    目录
                    <v-icon>mdi-dialpad</v-icon>
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
                bookId:'',
                tipText: '',
                dialog: false,
                snackbar: false,
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
            gotoAuthorDetails(id){
                this.$router.push("/book/author-details/"+id);
            },
            initData(){
                // 详情
                this.bookId = this.$route.params.bookId;
                this.getChapterInfo(this.bookId, 0)
            },
            // 上一章
            gotoPre(){
                if(this.pre == null){
                    this.snackbar = true;
                    this.tipText = "已经是第一章了";
                    return;
                }
                this.getChapterInfo(this.bookId, this.pre.id)
            },
            // 下一章
            gotoNext(){
                if(this.next == null){
                    this.snackbar = true;
                    this.tipText = "已经是最后一章了";
                    return;
                }
                this.getChapterInfo(this.bookId, this.next.id)
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
            }
        }
    }
</script>