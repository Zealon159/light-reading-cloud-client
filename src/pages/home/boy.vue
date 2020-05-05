<template>
  <v-container
    fluid
  >
    <v-row v-for="item in items" :key="item.id">
      <!-- 书单 -->
      <div v-if="item.itemType==1" class="item">
        <!-- 1.横版(2*3) -->
        <v-container v-if="item.booklist.style==1">
            <booklist-two-by-three :booklist="item.booklist"></booklist-two-by-three>
        </v-container>
        <!-- 2.竖版(1*3) -->
        <v-container v-else-if="item.booklist.style==2" >
            <booklist-one-by-three :booklist="item.booklist"></booklist-one-by-three>
        </v-container>
        <!-- 3.1+4本 -->
        <v-container v-else-if="item.booklist.style==3 && item.booklist.books.length>1">
            <booklist-one-plus-four :booklist="item.booklist"></booklist-one-plus-four>
        </v-container>
        <!-- 4.推荐1本 -->
        <v-container v-else-if="item.booklist.style==4 && item.booklist.books.length>1">
            <booklist-one :booklist="item.booklist"></booklist-one>
        </v-container>
      </div>
      <!-- Banner -->
      <v-container v-else-if="item.itemType==2" class="item">
        <banner :items="item.banner.items"></banner>
      </v-container>
    </v-row>
    <v-row style="height:35px"></v-row>
  </v-container>
</template>

<script>
    // 引入主页组件Banner、书单
    import banner from '@/components/banner'
    import booklistOneByThree from '@/components/booklist-one-by-three'
    import booklistOnePlusFour from '@/components/booklist-one-plus-four'
    import booklistTwoByThree from '@/components/booklist-two-by-three'
    import booklistOne from '@/components/booklist-one'

    export default {
        name: 'home',
        components: {
            banner,
            booklistOne,
            booklistOneByThree,
            booklistOnePlusFour,
            booklistTwoByThree
        },
        data: function ()  {
            return {
                items:[]
            }
        },
        computed: {
            
        },
        created() {
            this.initItems();
        },
        methods:{
            // 初始化主页
            initItems(){
                this.getRequest('/index', {type:2,page:1,limit:10}).then(resp => {
                    if (resp.code && resp.code == 200) {
                        this.items = resp.data;
                    }
                })
            },
            // 图书详情
            handleDetails(bookId) {
                this.$router.push('/book-details/'+bookId);
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

<style scoped>
    .item{
        width: 100%;
    }
</style>