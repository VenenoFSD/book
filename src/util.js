import config from './config'

export function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      }
    })
  })
}

export function showInfo(title) {
  wx.showToast({
    title,
    duration: 2000
  });
}
