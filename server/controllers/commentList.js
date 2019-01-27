const {mysql} = require('../qcloud');

module.exports = async ctx => {
  const {bookid} = ctx.request.query;
  const commentList = await mysql('comments').select('comments.*', 'cSessionInfo.user_info').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id').where('bookid', bookid);
  ctx.state.data = {
    list: commentList.map(v => {
      v.user_info = JSON.parse(v.user_info);
      return Object.assign({}, v);
    })
  }
};
