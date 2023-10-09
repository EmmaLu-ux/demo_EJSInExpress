var express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')

const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter) //获取 do 对象

var router = express.Router();

/* 记账本列表 */
router.get('/account', (req, res, next) => {
  let accounts = db.get('accounts').value()
  res.render('list', { accounts })
});

/* 获取添加记录页面 */
router.get('/account/create', (req, res, next) => {
  res.render('create')
})

/* 新增记录 */
router.post('/account/create', (req, res, next) => {
  // console.log(req.body);
  let id = shortid.generate()
  db.get('accounts').push({ id: id, ...req.body }).write()
  res.render('success', { msg: '添加成功！', url: '/account' })
})

module.exports = router;
