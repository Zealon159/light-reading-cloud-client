<template>
    <div>
        <v-row style="padding-left:10px;">
            <h3>{{booklist.name}}</h3>
            <v-spacer></v-spacer>
            <v-btn v-if="booklist.moreType==2" text color="primary" 
                @click="handleMore(booklist.id)">
                更多
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn v-else-if="booklist.moreType==3" text color="primary"
                @click="handleExchange(booklist.id,booklist.randomNumber)">
                换一换
                <v-icon>mdi-cached</v-icon>
            </v-btn>
        </v-row>
        
        <div v-for="book in booklist.books" 
            :key="book.bookId" 
            style="margin-top:15px">
            <v-row no-gutters @click="handleDetails(book.bookId)">
                <v-col cols="3" sm="3">
                    <v-img height="112" width="78" :src="book.imgUrl" ></v-img>
                </v-col>
                <v-col cols="9" sm="9" >
                <v-row><a>{{book.bookName}}</a></v-row>
                <v-row style="font-size:13px;color:#cccccc; margin-top:6px" >{{book.introduction|subString}}</v-row>
                <v-row style=" margin-top:6px">
                    <span style="font-size:14px;" >{{book.authorName}} </span>
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2" color="green" label small outlined>
                        {{book.categoryName}}
                    </v-chip>
                </v-row>
                </v-col>
            </v-row>
            <v-divider style="margin-top:12px"></v-divider>
        </div>
    </div>
</template>

<script>
    export default {
        // 传入子组件的参数写到props
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
