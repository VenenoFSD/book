<script>
  import {showInfo} from "./util";

  export default {
    name: "App",
    mounted () {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("用户已授权");
            wx.getUserInfo({
              success (res) {
                let data = JSON.parse(res.rawData);
                console.log(data);
                showInfo('登录成功');
                wx.setStorageSync('userInfo', data);
              }
            });
          } else {
            console.log("用户未授权");
          }
        }
      });
    }
  };
</script>

<style lang="scss">
  .btn {
    width: 100px;
    line-height: 40px;
    background-color: #63B8FF;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    &:active {
      background-color: #5faff3;
    }
  }
</style>
