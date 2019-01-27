<template>
  <div class="comment">
    <h2 class="title">我的评论</h2>
    <comment-list :commentList="commentList" type="user"></comment-list>
    <p class="tip" v-show="!openid.length">登录后才能查看已评论列表</p>
  </div>
</template>

<script>
  import CommentList from '../../components/CommentList'
  import {get} from "../../util";

  export default {
    data () {
      return {
        commentList: [],
        openid: ''
      }
    },
    methods: {
      async getCommentList () {
        const {list} = await get('/weapp/commentList', {openid: this.openid});
        this.commentList = list;
      }
    },
    onShow () {
      if (this.openid.length) {
        return;
      }
      this.openid = wx.getStorageSync('userInfo').openId;
      this.getCommentList();
    },
    components: {
      CommentList
    }
  }
</script>

<style scoped lang="scss">
  .comment {
    font-size: 16px;
    color: #444;
    .title {
      padding: 10px 0;
      text-align: center;
    }
    .tip {
      padding-top: 20px;
      text-align: center;
    }
  }
</style>
