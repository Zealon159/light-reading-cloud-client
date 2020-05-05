<template>
    <div>
        <v-row no-gutters >
            <v-col cols="9" sm="9">
                <a>{{item.booklist.books[0].bookName}}</a>
            </v-col>
            <v-col cols="3" sm="3">
                <v-img
                    height="112"
                    width="78"
                    src="http://q94iswz37.bkt.clouddn.com/165314.jpg"
                ></v-img>
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
                if(value.length > 62){
                    return value.substr(0,62)+"...";
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