<template>
  <div class="cart"  @click="toBookDetail()">
    <div class="img-wrapper">
      <image :src="book.image" mode="aspectFit" @click.stop="preview()"></image>
    </div>
    <div class="book-info">
      <h2>{{book.title}}</h2>
      <div class="book-info-container">
        <div class="info-left">
          <p>{{book.author}}</p>
          <p class="publisher">{{book.publisher}}</p>
        </div>
        <div class="info-right">
          <p v-if="book.rate > 0">{{book.rate}}分</p>
          <p class="no-rate" v-else>暂无评价</p>
          <p class="count">浏览量：{{book.count}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    props: {
      book: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      toBookDetail () {
        wx.navigateTo({
          url: `/pages/detail/main?id=${this.book.id}`
        });
      },
      preview () {
        wx.previewImage({
          urls: [this.book.image]
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .cart {
    margin: 0 16px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    height: 90px;
    overflow: hidden;
    &:last-of-type {
      border-bottom: none;
    }
    .img-wrapper {
      height: 100%;
      flex: 0 0 90px;
      overflow: hidden;
      margin-right: 2px;
      image {
        max-width: 90px;
        height: 90px;
      }
    }
    .book-info {
      flex: 1;
      overflow: hidden;
      padding-top: 6px;
      h2 {
        font-size: 16px;
        white-space: nowrap;
      }
      .book-info-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-left {
          width: calc(100% - 70px);
          height: 100%;
          padding-top: 16px;
          p {
            font-size: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.publisher {
              margin-top: 6px;
              color: #999;
            }
          }
        }
        .info-right {
          width: 60px;
          text-align: right;
          p {
            font-size: 16px;
            color: #ffd700;
            &.no-rate {
              font-size: 12px;
              color: orange;
            }
            &.count {
              margin-top: 10px;
              color: #444;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
