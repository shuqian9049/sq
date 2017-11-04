var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'baobei'
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/insert', function(req, res, next) {//添加
    var detail=req.body.detail
    var title=req.body.tit;
    var zuo=req.body.zuo;
    var sele=req.body.sele;
    res.header('Access-Control-Allow-Origin','*')
    pool.query(`INSERT INTO summernote (uid,title,name,time,detail) VALUES (${sele},'${title}','${zuo}',now(),'${detail}')`,function (err,rows) {
        res.send(rows)
        console.log(rows)
    })
});
router.get('/list', function(req, res, next) {//显示
    res.header('Access-Control-Allow-Origin','*')
    pool.query('SELECT * FROM summernote',function (err,rows) {
        res.send(rows)
    })
});
router.post('/del', function(req, res, next) {//删除
    var id=req.body.uid;
    res.header('Access-Control-Allow-Origin','*')
    pool.query(`DELETE FROM summernote WHERE id=`+id,function (err,rows) {
        res.send(rows)
        console.log(rows)
    })
});
router.post('/update', function(req, res, next) {//修改
    var uid=req.body.cc;
    var b=req.body.b;
    var bt=req.body.bt;
    var zz=req.body.zz;
    res.header('Access-Control-Allow-Origin','*')
    pool.query(`UPDATE summernote SET name="${zz}",title="${bt}",time=now(),detail="${b}" WHERE id=`+uid ,function (err,rows) {
        res.send(rows)
        console.log(rows)
    })
});
module.exports = router;
