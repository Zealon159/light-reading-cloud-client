<template>
    <div>
        <v-row style="padding-left:10px;">
            <h3>{{booklist.name}}</h3>
        </v-row>
        <v-row no-gutters style="margin-top:15px" @click="handleDetails(booklist.books[0].bookId)">
            <v-col cols="4" sm="4">
                <v-img
                    height="140"
                    width="102"
                    :src="booklist.books[0].imgUrl"
                ></v-img>
            </v-col>
            <v-col cols="8" sm="8">
                <v-row >
                    <a>{{booklist.books[0].bookName}}</a>
                    <v-spacer></v-spacer>
                    <v-rating
                        length=5
                        v-model="booklist.books[0].bookScore"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size=14
                    ></v-rating>
                    <div class="red--text ml-2" style="margin-right:10px">{{booklist.books[0].bookScore}}分</div>
                </v-row>
                <v-row>
                    <v-btn text style="margin:0px; padding:0px" >
                        <v-icon left>mdi-account-outline</v-icon>
                        {{booklist.books[0].authorName}}
                    </v-btn>
                </v-row>
                <v-row style="font-size:13px;color:#cccccc; margin-top:6px" >{{booklist.books[0].introduction|subString}}</v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        props: {
            booklist: {}
        },
        methods:{
            // 图书详情
            handleDetails(bookId) {
                this.$router.push('/book-details/'+bookId);
            },
            // 书单更多
            handleMore(booklistId){
                this.$router.push('/booklist/'+booklistId);
            },
            // 换一换
            handleExchange(booklistId, clientRandomNumber){
                this.getRequest('/index/getBooklistExchange', {booklistId:booklistId,clientRandomNumber:clientRandomNumber}).then(resp => {
                    if (resp.code && resp.code == 200) {
                        this.booklist.randomNumber = resp.data.randomNumber;
                        for(let j=0;j<this.booklist.books.length;j++){
                            this.booklist.books[j].bookId = resp.data.books[j].bookId;
                            this.booklist.books[j].bookName = resp.data.books[j].bookName;
                            this.booklist.books[j].introduction = resp.data.books[j].introduction;
                            this.booklist.books[j].imgUrl = resp.data.books[j].imgUrl;
                            this.booklist.books[j].authorId = resp.data.books[j].authorId;
                            this.booklist.books[j].authorName = resp.data.books[j].authorName;
                            this.booklist.books[j].categoryName = resp.data.books[j].categoryName;
                            this.booklist.books[j].wordCount = resp.data.books[j].wordCount;
                            this.booklist.books[j].serialStatusName = resp.data.books[j].serialStatusName;
                            this.booklist.books[j].likeCount = resp.data.books[j].likeCount;
                        }
                    }
                })
            }
        },
        filters: {
            // 截取字符串
            subString(value) {
                if(value == null){
                    return "";
                }
                if(value.length > 82){
                    return value.substr(0,82)+"...";
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