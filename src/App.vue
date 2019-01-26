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
                showInfo('登录成功');
                let data = JSON.parse(res.rawData);
                wx.login({
                  success (res) {
                    wx.request({
                      url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx3bb4b64b89511b83&secret=5aef451b4c277a6f875d0e34ce2993f8&js_code=${res.code}&grant_type=authorization_code`,
                      success (res) {
                        data.openId = res.data.openid;
                        console.log(data);
                        wx.setStorageSync('userInfo', data);
                      }
                    });
                  }
                });
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
