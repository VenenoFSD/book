const {mysql} = require('../qcloud');

module.exports = async ctx => {
  const {bookid, openid} = ctx.request.query;
  const mysqlSelect = mysql('comments').select('comments.*', 'cSessionInfo.user_info').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id');
  let commentList = [];
  if (bookid) {
    commentList = await mysqlSelect.where('bookid', bookid);
  } else if (openid) {
    commentList = await mysqlSelect.where('openid', openid);
  }
  ctx.state.data = {
    list: commentList.map(v => {
      v.user_info = JSON.parse(v.user_info);
      return Object.assign({}, v);
    })
  }
};
