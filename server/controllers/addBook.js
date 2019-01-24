const https = require('https');
const {mysql} = require('../qcloud');
const doubanApi = 'https://api.douban.com/v2/book/isbn/';

module.exports = async ctx => {
  const {isbn, openid} = ctx.request.body;
  if (isbn && openid) {
    const findRes = await mysql('books').select().where('isbn', isbn);
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      };
      return;
    }
    const url = doubanApi + isbn;
    const bookInfo = await getJSON(url);
    const {title, image, summary, alt, publisher, price} = bookInfo;
    const rate = bookInfo.rating.average;
    const tags = bookInfo.tags.map(item => `${item.title} ${item.count}`).join(',');
    const author = bookInfo.author.join(',');
    try {
      await mysql('books').insert({ isbn, openid, title, image, summary, alt, publisher, price, rate, tags, author });
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: `导入失败${e.sqlMessage}`
        }
      }
    }
  }
};

function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = '';
      res.on('data', data => {
        urlData += data;
      });
      res.on('end', () => {
        const bookInfo = JSON.parse(urlData);
        if (bookInfo.title) {
          resolve(bookInfo);
        } else {
          reject({});
        }
      });
    });
  });
}
