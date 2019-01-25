<template>
  <div class="book">
    <top-swiper :topList="topList"></top-swiper>
    <cart :key="item.id" v-for="item in books" :book="item"></cart>
    <p v-show="!more" class="more">没有更多数据</p>
  </div>
</template>

<script>
  import Cart from '../../components/Cart'
  import TopSwiper from '../../components/TopSwiper'
  import {get} from "../../util";

  export default {
    data () {
      return {
        books: [],
        page: 0,
        more: true,
        topList: []
      }
    },
    methods: {
      async getBookList (isInit = false) {
        if (isInit) {
          this.page = 0;
          this.more = true;
        }
        wx.showNavigationBarLoading();
        const {list} = await get('/weapp/bookList', {page: this.page});
        if (list.length < 10 && this.page > 0) {
          this.more = false;
        }
        if (isInit) { // ↓
          this.books = list;
          wx.stopPullDownRefresh();
        } else { // ↑
          this.books = this.books.concat(list);
        }
        wx.hideNavigationBarLoading();
      },
      async getTop () {
        const {list} = await get('/weapp/top');
        this.topList = list;
      }
    },
    created () {
      this.getTop();
      this.getBookList(true);
    },
    onPullDownRefresh () {
      this.getTop();
      this.getBookList(true);
    },
    onReachBottom () {
      if (!this.more) {
        return false;
      }
      this.page++;
      this.getBookList();
    },
    components: {
      Cart,
      TopSwiper
    }
  }
</script>

<style>
  .more {
    text-align: center;
    font-size: 12px;
    padding: 6px 0;
  }
</style>
