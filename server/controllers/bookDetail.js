const {mysql} = require('../qcloud');

module.exports = async ctx => {
  const {id} = ctx.request.query;
  ctx.state.data = await mysql('books').select().where('id', id).first();
  await mysql('books').where('id', id).increment('count', 1);
};
