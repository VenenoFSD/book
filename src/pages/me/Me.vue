<template>
  <div class="me">
    <div class="m-user-info">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <year-progress></year-progress>
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="btn" v-show="!showAdd">点击登录</button>
    <button class="btn" @click="scanBook" v-show="showAdd">添加图书</button>
  </div>
</template>

<script>
  import YearProgress from '../../components/YearProgress'
  import config from '../../config'
  import qcloud from 'wafer2-client-sdk'
  export default {
    data () {
      return {
        userInfo: {
          avatarUrl: '/static/img/unlogin.png',
          nickName: '未登录'
        },
        showAdd: false
      }
    },
    methods: {
      bindGetUserInfo () {
        let self = this;
        qcloud.setLoginUrl(config.loginUrl);
        // const session = qcloud.Session.get();
        // if (session) { // 第二次登录，或者本地已经有登录态，可使用本函数更新登录态
        //   qcloud.loginWithCode({
        //     success (res) {
        //       console.log('再次登录', res);
        //     },
        //     fail (err) {
        //       console.error(err);
        //     }
        //   });
        // } else {
        // }
        // 首次登录
        qcloud.login({
          success (res) {
            console.log('首次登录', res);
            self.userInfo = res;
            self.showAdd = true;
            wx.setStorageSync('userInfo', res);
          },
          fail (err) {
            console.error(err);
          }
        });
      },
      scanBook () {
        wx.scanCode({
          success(res) {
            console.log(res);
          }
        });
      }
    },
    created () {
      let info = wx.getStorageSync('userInfo');
      if (info) {
        this.userInfo = info;
        this.showAdd = true;
      }
    },
    components: {
      YearProgress
    }
  }
</script>

<style lang="scss">
  .me {
    padding-top: 50rpx;
    text-align: center;
    .m-user-info {
      margin-bottom: 150rpx;
      img {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        margin-bottom: 8px;
      }
      p {
        font-size: 16px;
        color: #666;
      }
    }
  }
</style>
