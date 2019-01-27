<template>
  <div class="detail">
    <div class="book-introduction">
      <image :src="detail.image" mode="aspectFit"></image>
      <div class="info">
        <p class="title">{{detail.title}}</p>
        <p class="author">{{detail.author}}</p>
        <p>{{detail.publisher}}</p>
      </div>
    </div>
    <div class="rate-container">
      <div class="rate">
        <p class="large">{{detail.rate}}</p>
        <p class="small">评分</p>
      </div>
      <div class="count">
        <p class="large">{{detail.count}}</p>
        <p class="small">阅读</p>
      </div>
      <div class="price">
        <p class="large">{{price}}</p>
        <p class="small">价格</p>
      </div>
    </div>
    <ul class="tags">
      <li v-for="(item, index) in tags" :key="index">{{item}}</li>
    </ul>
    <div class="summary">
      <h2>作品简介</h2>
      <p>{{detail.summary}}</p>
    </div>
    <comment-list :commentList="commentList"></comment-list>
    <div class="comment" v-show="showComment">
      <textarea placeholder="评价一下这本书" class="inputText" v-model="comment"></textarea>
      <div class="select">
        <div class="location">
          地理位置：<switch @change="getGeo" color="#63B8FF" :checked="location"></switch>
        </div>
        <div class="phone">
          手机型号：<switch @change="getPhone" color="#63B8FF" :checked="phone"></switch>
        </div>
        <div class="submit">
          <button @click="addComment">评论</button>
        </div>
      </div>
    </div>
    <button open-type="share" class="btn d-btn">转发给好友</button>
  </div>
</template>

<script>
  import {get, post, showModal} from "../../util";
  import CommentList from '../../components/CommentList'

  export default {
    name: "Detail",
    data () {
      return {
        bookId: '',
        detail: {},
        price: '',
        tags: [],
        comment: '',
        phone: '',
        location: '',
        openId: '',
        commentList: []
      }
    },
    methods: {
      async getDetail () {
        this.detail = await get('/weapp/bookDetail', {id: this.bookId});
        wx.setNavigationBarTitle({
          title: this.detail.title
        });
        this.price = this.detail.price.replace('元', '');
        this.tags = this.detail.tags.split(',');
      },
      getGeo (e) {
        const ak = '6IX1u4Xe9uV5Wqi7NIm0ZHmOQIHL7y1s';
        const url = 'http://api.map.baidu.com/geocoder/v2/';
        let self = this;
        if (e.target.value) {
          wx.getLocation({
            success (geo) {
              wx.request({
                url,
                data: {
                  ak,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json'
                },
                success (res) {
                  if (res.data.status === 0) {
                    self.location = res.data.result.addressComponent.city;
                  } else {
                    console.log("定位失败");
                    self.location = '未知地点';
                  }
                }
              });
            }
          });
        } else {
          this.location = '';
        }
      },
      getPhone (e) {
        this.phone = e.target.value ? wx.getSystemInfoSync().model : '';
      },
      async addComment () {
        if (!this.comment.length) {
          return;
        }
        const data = {
          bookid: this.bookId,
          comment: this.comment,
          location: this.location,
          phone: this.phone,
          openid: this.openId
        };
        try {
          await post('/weapp/addComment', data);
          this.comment = '';
          this.getCommentList();
        } catch (e) {
          showModal('评论失败', e.msg);
        }
      },
      async getCommentList () {
        const {list} = await get('/weapp/commentList', {bookid: this.bookId});
        this.commentList = list;
      }
    },
    computed: {
      showComment () {
        if (this.openId === undefined) {  //  未登录
          return false;
        }
        if (this.commentList.filter(item => item.openid === this.openId).length) {
          return false;
        }
        return true;
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target)
      }
      return {
        title: this.detail.title,
        path: `/page/detail/main?id=${this.bookId}`,
        imageUrl: this.detail.image
      }
    },
    mounted () {
      this.bookId = this.$root.$mp.query.id;
      this.getDetail();
      this.getCommentList();
      this.openId = wx.getStorageSync('userInfo').openId;
    },
    components: {
      CommentList
    }
  };
</script>

<style scoped lang="scss">
  .detail {
    padding-top: 10px;
    .book-introduction {
      display: flex;
      align-items: center;
      padding: 0 16px;
      image {
        flex: 0 0 100px;
        height: 160px;
      }
      .info {
        flex: 1;
        padding-left: 30px;
        p {
          color: #666;
          font-size: 12px;
          &.title {
            color: #000;
            font-size: 20px;
            margin-bottom: 12px;
          }
          &.author {
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .rate-container {
      display: flex;
      margin-bottom: 6px;
      >div {
        flex: 1;
        text-align: center;
        padding: 10px 0;
        .large {
          font-size: 24px;
          color: #666;
          margin-bottom: 6px;
          font-weight: bold;
        }
        .small {
          font-size: 12px;
          color: #888;
        }
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 14px;
      padding: 0 16px;
      li {
        border: 2px solid skyblue;
        border-radius: 8px;
        font-size: 13px;
        margin: 0 8px 6px 0;
        padding: 5px 6px;
        color: #666;
      }
    }
    .summary {
      background-color: #f8f8f8;
      padding: 16px 20px;
      border-radius: 20px;
      margin-bottom: 10px;
      h2 {
        font-size: 20px;
        color: #222;
        margin-bottom: 12px;
      }
      p {
        text-indent: 20px;
        font-size: 16px;
        line-height: 28px;
        color: #555;
      }
    }
    .comment {
      border-radius: 20px;
      border: 1px solid #eee;
      .inputText {
        width: calc(100% - 20px);
        height: 140px;
        padding: 10px 0;
        margin: 0 10px;
        font-size: 16px;
        border-bottom: 1px solid #f6f6f6;
      }
      .select {
        display: flex;
        padding: 6px 3px;
        align-items: center;
        >div {
          text-align: center;
          font-size: 14px;
          flex: 1;
        }
        .submit {
          flex: 0 0 90px;
          text-align: center;
          button {
            width: 64px;
            color: #fff;
            background-color: #63B8FF;
            line-height: 36px;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }
    .tip {
      font-size: 14px;
      color: #666;
      text-align: center;
      padding: 6px 0;
    }
    .d-btn {
      margin: 8px auto;
      width: 650rpx;
    }
  }
</style>
