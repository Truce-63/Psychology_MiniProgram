var moment = require('moment');
var express = require('express');
var app = express();
var router = express.Router();
// 引入封装好的接口
var cate = require("../controllers/cateControllers");

var bodyparser = require('body-parser'); // 使用post请求需要用中间件转换 get请求在req.query中拿值，post请求在req.body中拿值
router.use(bodyparser.json())


router.post("/getUser", cate.getUser); // 获取所有的用户信息
router.post("/register", cate.register); // 新增用户
router.post("/updateUser", cate.updateUser); // 修改用户接口,根据id修改用户
router.post("/deleteUser", cate.deleteUser); // 删除用户,根据id删除用户
router.post("/signIn", cate.signIn); // 登录接口

router.get("/getExamInfo", cate.getExamInfo); // 考试发题接口
router.get("/setStudentInfo", cate.setStudentInfo); // 存储学生考试成绩信息接口
router.get("/getScoreList", cate.getScoreList); // 获取当前用户的历史考试记录
router.get("/getRankList", cate.getRankList); // 获取用户表内每个用户最新时间的数据

router.post("/addActivity", cate.addActivity); // 新增活动推送
router.post("/updateActivity", cate.updateActivity); // 修改活动推送
router.post("/delActivity", cate.delActivity); // 删除活动推送
router.post("/getActivity", cate.getActivity); // 获取活动推送
router.post("/addUserActivity", cate.addUserActivity); // 新增用户预约活动
router.post("/updateUserActivity", cate.updateUserActivity); // 修改用户预约活动
router.post("/delUserActivity", cate.delUserActivity); // 删除用户预约活动
router.post("/getUserActivity", cate.getUserActivity); // 获取用户预约活动
router.post("/addClassTabs", cate.addClassTabs); // 新增分类tab
router.post("/updateClassTabs", cate.updateClassTabs); // 修改分类tab
router.post("/delClassTabs", cate.delClassTabs); // 删除分类tab
router.post("/getClassTabs", cate.getClassTabs); // 获取分类tab 也就是分类title
router.post("/getAllClassContent", cate.getAllClassContent); // 查询所有分类下的内容
router.post("/addAllClassContent", cate.addAllClassContent); // 新增分类内容 向itemclassify表中插入数据
router.post("/editAllClassContent", cate.editAllClassContent); // 修改分类内容 向itemclassify表中更新数据
router.post("/delAllClassContent", cate.delAllClassContent); // 删除分类内容 向itemclassify表中删除数据
router.post("/getClassList", cate.getClassList); // 获取分类tab的内容 也就是每个分类下的内容

router.post("/addUserfavorite", cate.addUserfavorite); // 新增用户收藏
router.post("/updateUserfavorite", cate.updateUserfavorite); // 修改用户收藏
router.post("/delUserfavorite", cate.delUserfavorite); // 删除用户收藏
router.post("/getUserfavorite", cate.getUserfavorite); // 获取用户收藏
router.post("/getShopEvaluate", cate.getShopEvaluate); // 查询商品评价 根据商品id
router.post("/addShopEvaluate", cate.addShopEvaluate); // 新增商品评价 根据用户id 商品id
router.post("/editShopEvaluate", cate.editShopEvaluate); // 修改商品评价 根据id
router.post("/delShopEvaluate", cate.delShopEvaluate); // 删除商品评价 向userevaluate表中删除数据

router.post("/getTimuList", cate.getTimuList); /// 获取 题目列表
router.post("/addTimuList", cate.addTimuList); // 新增 题目列表
router.post("/updateTimuList", cate.updateTimuList); // 更新 题目列表
router.post("/delTimuList", cate.delTimuList); // 删除 题目列表

// router.post("/getScoreRecordList", cate.getScoreRecordList); /// 获取 答题记录列表
router.post("/getTestResult",cate.getTestResult); //获取 一条测试结果
router.post("/getTestResultList",cate.getTestResultList); //获取 测试结果列表
router.post("/addTestResult",cate.addTestResult); //新增 测试结果
// router.post("/addScoreRecordList", cate.addScoreRecordList); // 新增 答题记录列表
router.post("/updateScoreRecordList", cate.updateScoreRecordList); // 更新 答题记录列表
router.post("/delScoreRecordList", cate.delScoreRecordList); // 删除 答题记录列表




// 图片上传
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
router.post('/uploadImg', (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8';
    // 配置上传文件的目录 路径推荐写绝对路径 注意：保证routes文件下有upload文件夹用于存放图片
    form.uploadDir = path.join(__dirname + "/upload"); // __dirname可以取到当前文件的绝对路径 具体可以console.log打印相关信息
    // 保留上传文件的后缀
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, frelds, files) {
        console.log(files, '====files');
        var filename = files.tweetPic.newFilename
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var time = moment(Date.now()).format('YYYYMMDDHHmmss');
        var avatarName = time + '-' + type + '.png';
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.tweetPic.filepath, newPath);  //重命名
        // res.send({ data: "/upload/" + avatarName, files: files })
        res.send({
            "data": {
                localIamgeAddress: 'http://localhost:6008/routes/upload/' + avatarName
            },
            "status": 200,
            "msg": "图片上传成功!"
        })
    })
})


module.exports = router;
