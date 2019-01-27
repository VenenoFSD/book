<template>
  <div class="comment-list">
    <div class="comment-list-item" v-for="item in commentList" :key="item.id" @click="handleClick(item.bookid)">
      <div class="header">
        <div class="user">
          <image :src="item.user_info.avatarUrl" mode="aspectFit"></image>
          <p>{{item.user_info.nickName}}</p>
        </div>
        <div class="info">
          <span v-if="item.location.length">{{item.location}}</span>
          <span v-else>未知地点</span>
          --
          <span v-if="item.phone.length">{{item.phone}}</span>
          <span v-else>未知型号</span>
        </div>
      </div>
      <div class="comment-container">{{item.comment}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentList",
    props: {
      commentList: {
        type: Array,
        default: () => []
      },
      type: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick (id) {
        if (this.type === 'user') {
          wx.navigateTo({
            url: `/pages/detail/main?id=${id}`
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .comment-list {
    .comment-list-item {
      padding: 16px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
      background-color: #f8f8f8;
      font-size: 16px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .user {
          display: flex;
          image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          p {
            line-height: 40px;
          }
        }
        .info {
          font-size: 14px;
          color: #999;
        }
      }
      .comment-container {
        text-indent: 10px;
        line-height: 28px;
        color: #444;
      }
    }
  }
</style>
