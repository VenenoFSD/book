const {mysql} = require('../qcloud');

module.exports = async ctx => {
  const {page} = ctx.request.query;
  const size = 10;
  const list = await mysql('books').select('*').limit(size).offset(Number(page) * size);
  ctx.state.data = {
    list
  }
};
