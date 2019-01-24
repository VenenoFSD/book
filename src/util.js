import config from './config'

export function get(url, data) {
  return request(url, 'GET', data);
}

export function post(url, data) {
  return request(url, 'POST', data);
}

export function showInfo(title) {
  wx.showToast({
    title,
    duration: 2000
  });
}

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    confirmColor: '#3cc51f'
  });
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method,
      data,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          showModal('操作失败', res.data.data.msg);
          reject(res.data);
        }
      }
    });
  });
}
