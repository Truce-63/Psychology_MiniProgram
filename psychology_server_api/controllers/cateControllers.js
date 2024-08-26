// 注释：SQL 语句对大小写不敏感。SELECT 等效于 select。
// SELECT - 从数据库表中获取数据
// UPDATE - 更新数据库表中的数据
// DELETE - 从数据库表中删除数据
// INSERT INTO - 向数据库表中插入数据
var db = require("../util/dbconfig");

// 查询用户
getUser = (req, res) => {
    let sql;
    let {
        username
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    if (username) { // 如果有用户名 则根据用户名精准查询
        sql = `select * from users where username = '${username}'`
    } else { // 否则查询用户
        sql = "select * from users";
    }

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '搜索失败'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "搜索成功"
            });
        }
    })
}

// 新增用户
register = (req, res) => {
    let {
        username,
        password,
        userphone,
        head_portrait
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql1 = `select * from users where username = '${username}'` // 查找数据表中是否已经存在用户
    let sql2 = `INSERT INTO users(username,password,userphone,head_portrait) VALUES(?,?,?,?)` // 插入语句，将前端传递过来的数据插入到数据库中
    db.query(sql1, function (err, data) {
        if (err) {
            res.send({
                "msg": "注册失败",
                "stutas": 500
            });
        } else {
            if (data.length == 0) { // data 为查询出来的结果，如果查询的手机号不存在，将会返回一个空数据 所有此时 data[0]==undefined, 执行插入语句操作;
                db.query(sql2, [username, password, userphone, head_portrait], function (err, data) {
                    if (err) {
                        res.send({
                            "stutas": 500,
                            "msg": "注册失败!",
                        });
                    } else {
                        res.send({
                            "msg": "注册成功",
                            "status": 200
                        });
                    }
                });
            } else {
                // 当tel用户存在时
                res.send({
                    "status": 0,
                    "msg": '用户名已存在'
                })
            }
        }
    });
}

// 修改用户接口,根据id修改用户
updateUser = (req, res) => {
    let {
        username,
        password,
        userphone,
        head_portrait,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update users set password='${password}',username='${username}',userphone='${userphone}',head_portrait='${head_portrait}' where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "更新失败 " + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "更新成功",
                status: 200
            });
        }
    });
}

// 删除用户,根据id删除用户
deleteUser = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from users where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 登录接口
signIn = (req, res) => {
    let {
        username,
        password
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `select * from users where FIND_IN_SET('${username}', username)`; // 查询语句
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '登录失败'
            })
        } else {
            // 当data数组不为空时，代表该手机号注册过，然后匹配密码
            if (data.length == 0) {
                // 当 data 为空数组时，代表该手机号没有注册
                res.send({
                    "data": data,
                    "status": 0,
                    "msg": "该用户没有注册"
                });
            } else {
                if (data[0].password == password) {
                    res.send({
                        "data": data[0],
                        "status": 200,
                        "msg": "登录成功！"
                    });
                } else {
                    res.send({
                        "status": 500,
                        "msg": "密码错误"
                    });
                }
            }
        }
    })

}

getExamInfo = (req, res) => { // 获取试卷信息对象
    let {
        pageNo
    } = req.query;
    let sql = `select * from(select * from timu limit ${pageNo}, 1)
    a
    left join jieguo on a.id = jieguo.timu_id`
    db.query(sql, (err, data) => {
        console.log(data, '----')
        if (err) {
            return res.json({
                status: -1,
                msg: '获取题目信息失败'
            })
        } else {
            if (data.length === 0) {
                res.send({
                    "data": {},
                    "status": 201,
                    "msg": "出题失败"
                });
            } else {
                let list = [],
                    curcontent, timu_id, zhengquejieguo;
                data.forEach(item => {
                    zhengquejieguo = item.zhengquejieguo;
                    timu_id = item.timu_id;
                    curcontent = item.curcontent;
                    list.push({
                        optionname: item.optionname,
                        optionval: item.optionval,
                        optionTips: item.tips
                    });
                });
                res.send({
                    "data": {
                        correct_results: zhengquejieguo,
                        curnum: timu_id,
                        curcontent: curcontent,
                        optionList: list
                    },
                    "status": 200,
                    "msg": "出题成功"
                });
            }

        }
    })
}

setStudentInfo = (req, res) => { // 向学生信息表中插入考试数据
    let sql = `INSERT INTO studentinfo(student_id,student_name,curscore,time,answertime) VALUES(?,?,?,?,?)` // 插入语句，将前端传递过来学生信息插入到数据库中
    let paramArr = [req.query.student_id, req.query.student_name, req.query.curscore, req.query.time, req.query.answertime];
    db.query(sql, paramArr, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: -1,
                msg: '学生本次考试成绩无效'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `您本次考试成绩为${req.query.curscore}分`
            });
        }
    })
}

getScoreList = (req, res) => { // 获取当前用户历次成绩 根据users表内id 匹配studentinfo表内的student_id进行查询
    let {
        id
    } = req.query;
    let sql = `select * from studentinfo where student_id = '${id}'`
    db.query(sql, (err, data) => {
        console.log(data)
        if (err) {
            console.log(err);
            return res.json({
                status: -1,
                msg: '搜索失败'
            })
        } else {
            console.log(data)
            res.send({
                "data": data,
                "status": 200,
                "msg": "搜索成功"
            });
        }
    })
}

getRankList = (req, res) => { // 获取排行榜列表
    let sql = `select a.* from studentinfo a 
    where a.time=(select max(time) 
    from studentinfo t where t.student_id=a.student_id)
    order by a.curscore desc`; // 获取每个用户student_id最新时间的数据，按照分数降序排列
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '获取排行榜列表失败'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "搜索成功"
            });
        }
    })
}

// 新增活动推送
addActivity = (req, res) => {
    let {
        activity_name,
        activity_con,
        activity_time,
        activity_address,
        activity_tips
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO activitylist(activity_name,activity_con,activity_time,activity_address,activity_tips) VALUES(?,?,?,?,?)` // 插入语句，将前端传递过来学生信息插入到数据库中
    let paramArr = [activity_name, activity_con, activity_time, activity_address, activity_tips];
    db.query(sql, paramArr, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: -1,
                msg: '新增失败'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `新增成功`
            });
        }
    })
}

// 修改活动推送
updateActivity = (req, res) => {
    let {
        activity_name,
        activity_con,
        activity_time,
        activity_address,
        activity_tips,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update activitylist set
    activity_name='${activity_name}',
    activity_con='${activity_con}',
    activity_time='${activity_time}',
    activity_address='${activity_address}',
    activity_tips='${activity_tips}'
    where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败" + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除活动推送
delActivity = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from activitylist where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取活动推送
getActivity = (req, res) => {
    let sql = `select * from activitylist order by id desc`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "成功!"
            });
        }
    })
}

// 新增用户预约活动
addUserActivity = (req, res) => {
    let {
        activity_name,
        activity_con,
        activity_time,
        activity_address,
        activity_tips,
        user_id,
        activity_id,
        appointment_status
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO useractivitylist(activity_name,activity_con,activity_time,activity_address,activity_tips, user_id, activity_id, appointment_status) VALUES(?,?,?,?,?,?,?,?)` // 插入语句，将前端传递过来学生信息插入到数据库中
    let paramArr = [activity_name, activity_con, activity_time, activity_address, activity_tips, user_id, activity_id, appointment_status];
    db.query(sql, paramArr, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: -1,
                msg: '新增失败'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `新增成功`
            });
        }
    })
}

// 修改用户预约活动
updateUserActivity = (req, res) => {
    let {
        activity_name,
        activity_con,
        activity_time,
        activity_address,
        activity_tips,
        user_id,
        activity_id,
        appointment_status,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update useractivitylist set
    activity_name='${activity_name}',
    activity_con='${activity_con}',
    activity_time='${activity_time}',
    activity_address='${activity_address}',
    activity_tips='${activity_tips}',
    user_id='${user_id}',
    activity_id='${activity_id}',
    appointment_status='${appointment_status}'
    where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败" + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除用户预约活动
delUserActivity = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from useractivitylist where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取用户预约活动
getUserActivity = (req, res) => {
    let {
        user_id,
        activity_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql;
    if (activity_id && user_id) {
        sql = `select * from useractivitylist where user_id = ${user_id} and activity_id = ${activity_id}`;
    } else if (user_id) {
        sql = `select * from useractivitylist where user_id = ${user_id}`;
    } else {
        sql = `select * from useractivitylist`;
    }
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "成功!"
            });
        }
    })
}

// 新增分类tab
addClassTabs = (req, res) => {
    let {
        class_name
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO classify(class_name) VALUES(?)` // 插入语句，将前端传递过来信息插入到数据库中
    db.query(sql, [class_name], function (err, data) {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `成功!`
            });
        }
    })
}

// 修改分类tab
updateClassTabs = (req, res) => {
    let {
        class_name,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update classify set class_name='${class_name}' where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败" + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除分类tab
delClassTabs = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from classify where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取分类tab 也就是分类title
getClassTabs = (req, res) => {
    let sql = `select * from classify`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "成功!"
            });
        }
    })
}

// 查询所有分类下的内容
getAllClassContent = (req, res) => {
    let sql;
    let {
        title,
        shop_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    if (title) { // 如果有输入标题 则根据标题模糊匹配 [这里指的是：文章标题]
        sql = `select * from itemclassify where item_name like '%${title}%'`;
    } else if (shop_id) {
        sql = `select * from itemclassify where id = ${shop_id}`;
    } else { // 否则查询分类里面的内容
        sql = "select * from itemclassify order by id desc"; // 由于此处id是自增id 也可以标识文章的先后顺序
    }


    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '搜索失败'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "搜索成功"
            });
        }
    })
}

// 新增分类内容 向itemclassify表中插入数据
addAllClassContent = (req, res) => {
    let sql = `INSERT INTO itemclassify(usershop_id,class_id,item_name,item_image,item_practice,update_time,is_recommend) VALUES(?,?,?,?,?,?,?)` // 插入语句
    let {
        usershop_id,
        class_id,
        item_name,
        item_image,
        item_practice,
        update_time,
        is_recommend
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let paramArr = [usershop_id, class_id, item_name, item_image, item_practice, update_time, is_recommend];
    db.query(sql, paramArr, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: -1,
                msg: '系统开小差了'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `成功!`
            });
        }
    })
}

// 修改分类内容 向itemclassify表中更新数据
editAllClassContent = (req, res) => {
    let {
        usershop_id,
        class_id,
        item_name,
        item_image,
        item_practice,
        id,
        update_time,
        is_recommend
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update itemclassify set usershop_id='${usershop_id}',
    class_id='${class_id}',
    item_name='${item_name}',
    item_image='${item_image}',
    item_practice='${item_practice}',
    update_time='${update_time}',
    is_recommend='${is_recommend}' where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败 " + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除分类内容 向itemclassify表中删除数据
delAllClassContent = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from itemclassify where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取分类tab的内容 也就是每个分类下的内容
getClassList = (req, res) => {
    let {
        class_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `select * from(select * from classify where id = ${class_id})
    a
    left join itemclassify on a.id = itemclassify.class_id
    order by update_time desc`; // 按照更新时间降序排列
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: 500,
                msg: '此分类下暂无数据'
            })
        } else {
            let list = [];
            data.forEach(item => {
                if (item.id) {
                    list.push(item);
                } else {
                    list = [];
                }
            });
            res.send({
                "data": list,
                "status": 200,
                "msg": "成功!"
            });
        }
    })
}

// 新增用户收藏
addUserfavorite = (req, res) => {
    let {
        item_image,
        item_name,
        class_id,
        shop_id,
        user_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO userfavorite(item_image, item_name, class_id, shop_id, user_id) VALUES(?,?,?,?,?)` // 插入语句，将前端传递过来信息插入到数据库中
    db.query(sql, [item_image, item_name, class_id, shop_id, user_id], function (err, data) {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `成功!`
            });
        }
    })
}

// 修改用户收藏
updateUserfavorite = (req, res) => {
    let {
        item_image,
        item_name,
        class_id,
        shop_id,
        user_id,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update userfavorite set
    item_image='${item_image}',
    item_name='${item_name}',
    class_id='${class_id}',
    shop_id='${shop_id}',
    user_id='${user_id}'
    where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败" + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除用户收藏
delUserfavorite = (req, res) => {
    let {
        user_id,
        shop_id,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql;
    if (id) {
        sql = `delete from userfavorite where id = ${id}`;
    } else {
        sql = `delete from userfavorite where user_id = ${user_id} and shop_id = ${shop_id}`;
    }
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取用户收藏
getUserfavorite = (req, res) => {
    let {
        user_id,
        shop_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql;
    if (shop_id && user_id) {
        sql = `select * from userfavorite where user_id = ${user_id} and shop_id = ${shop_id}`;
    } else if (user_id) {
        sql = `select * from userfavorite where user_id = ${user_id}`;
    } else {
        sql = `select * from userfavorite`;
    }

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '系统出小差了'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "成功!"
            });
        }
    })
}

// 查询文章评价 根据文章id
getShopEvaluate = (req, res) => {
    let sql;
    let {
        shop_id,
        user_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    if (shop_id) { // 如果有文章id 则根据文章id精准匹配 [这里指的是：文章唯一id]
        sql = `select * from userevaluate where shop_id = ${shop_id}`
    } else if (user_id) { // 根据用户 也就是商户id进行查询
        sql = `select * from userevaluate where user_id = ${user_id}`
    } else { // 否则查询评价里面的内容
        sql = "select * from userevaluate order by id desc"; // 由于此处id是自增id 也可以标识评价的先后顺序
    }

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '搜索失败'
            })
        } else {
            res.send({
                "data": data,
                "status": 200,
                "msg": "搜索成功"
            });
        }
    })
}

// 新增文章评价 根据用户id 文章id
addShopEvaluate = (req, res) => {
    let sql = `INSERT INTO userevaluate(user_id,user_name,shop_id,evaluate_start,evaluate_content) VALUES(?,?,?,?,?)` // 插入语句
    let {
        order_id,
        user_id,
        user_name,
        shop_id,
        evaluate_start,
        evaluate_content
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let paramArr = [user_id, user_name, shop_id, evaluate_start, evaluate_content];
    db.query(sql, paramArr, function (err, data) {
        console.log(err, data)
        if (err) {
            return res.json({
                status: -1,
                msg: '系统开小差了'
            })
        } else {
            res.send({
                "status": 200,
                "msg": `成功!`
            });
        }
    })
}

// 修改文章评价 根据id
editShopEvaluate = (req, res) => {
    let {
        id,
        evaluate_start,
        evaluate_content
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update userevaluate set evaluate_start='${evaluate_start}',evaluate_content='${evaluate_content}' where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "修改失败 " + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "修改成功",
                status: 200
            });
        }
    });
}

// 删除文章评价 向userevaluate表中删除数据
delShopEvaluate = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `delete from userevaluate where id = ${id}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

// 获取 题目列表
getTimuList = (req, res) => {
    let {
        problem_title,
        problem_type,
        type
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值

    let sql;
    if (problem_title) { // 如果有输入标题 则根据标题模糊匹配 [这里指的是：题目标题]
        sql = `select * from test_problem where problem_title like '%${problem_title}%'`;
    } else if (problem_type) {
        sql = `select * from test_problem where problem_type = '${problem_type}'`;
    } else {
        sql = `select * from test_problem`
    }

    db.query(sql, async (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '失败'
            })
        } else {

            res.send({
                "data": data,
                "status": 200,
                "msg": "成功"
            });
        }
    })
}

// 新增 题目列表
addTimuList = (req, res) => {
    let {
        problem_title,
        problem_option,
        problem_type,
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO test_problem(problem_title,problem_option,problem_type) VALUES(?,?,?)`;
    db.query(sql, [problem_title, problem_option, problem_type], function (err, data) {
        console.log(err, data, '====err, data');
        if (err) {
            res.send({
                "stutas": 500,
                "msg": err,
            });
        } else {
            res.send({
                "msg": "新增成功",
                "status": 200
            });
        }
    });
}

// 更新题目列表
updateTimuList = (req, res) => {
    let {
        problem_title,
        problem_option,
        problem_type,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update test_problem set problem_title='${problem_title}',problem_option='${problem_option}',problem_type='${problem_type}' where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "更新失败 " + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "更新成功",
                status: 200
            });
        }
    });
}

// 删除 题目列表
delTimuList = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值

    let sql = `delete from test_problem where id = ${id}`;

    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

//获取测试结果
// getTestResults = (user_type, score) => {
//     // 假设这是您的抑郁测评结果数组  
//     const depressionResults = [{
//             type: '无抑郁倾向',
//             description: '情绪状态正常，无抑郁迹象',
//             suggestion: '继续保持良好状态，关注身心健康'
//         },
//         {
//             type: '轻度抑郁',
//             description: '偶尔感到情绪低落，但能够自我调节',
//             suggestion: '尝试增加积极活动，寻求社会支持'
//         },
//         {
//             type: '中度抑郁',
//             description: '情绪持续低落，影响日常生活',
//             suggestion: '建议寻求专业心理咨询，加强自我关怀'
//         },
//         {
//             type: '重度抑郁',
//             description: '情绪严重低落，需紧急干预',
//             suggestion: '立即就医，接受专业治疗，避免自我伤害'
//         }
//     ];

//     // 假设这是您的人格测评结果数组  
//     const personalityResults = [{
//             "type": "开放性",
//             "description": "富有想象力，乐于探索新事物",
//             "suggestion": "继续拓宽视野，保持创新思维"
//         },
//         {
//             "type": "尽责性显著",
//             "description": "做事认真负责，追求高效",
//             "suggestion": "注意平衡工作与生活，避免过度劳累"
//         },
//         {
//             "type": "外向性非常显著",
//             "description": "热情洋溢，善于交际",
//             "suggestion": "发挥社交优势，同时学会独处思考"
//         },
//         {
//             "type": "宜人性不显著",
//             "description": "在人际交往中表现较为保留",
//             "suggestion": "尝试更加开放和友善，增进人际关系"
//         },
//         {
//             "type": "神经质中等显著",
//             "description": "情绪较为敏感，易受外界影响",
//             "suggestion": "学习情绪管理技巧，增强心理韧性"
//         },
//     ];


//     //智力测试结果
//     const intelligenceResults = [{
//         type: '极高智商：超人你好，你的智商已经超越了99%的人类，堪比爱因斯坦！',
//         description: '恭喜你！你的智商如同璀璨的明星，高悬在智慧的顶峰。你拥有超凡的分析力和非凡的创造力，能够在复杂问题中游刃有余。你的思维如闪电般迅捷，灵感源源不断。你注定是改变世界的力量，无论是科学研究、创新发明，还是艺术创作，你都能在自己选择的领域中脱颖而出。未来在你面前无限宽广，等你用智慧去探索。',
//         suggestion: '努力学习有助于提高智力哦~'
//     },
//     {
//         type: '卓越智者',
//         description: '你的智力水平远超常人，思维敏捷，逻辑严密。你如同一位智者，在知识的海洋中遨游，能轻松理解复杂的概念，解决棘手的问题。你具备出色的学习能力和创新意识，能在学术或职业领域中取得非凡的成就。你是团队中的智力担当，也是朋友中的策略高手。无论面对什么挑战，你总能从容应对，找到最佳的解决方案。',
//         suggestion: '努力学习有助于提高智力哦~'
//     },
//     {
//         type: '智慧之光',
//         description: '你的智力如一束明亮的光，照亮了前行的路。你具备超越普通人的理解力和推理能力，能够迅速掌握新知识，并将其灵活应用。无论是学习新技能，还是应对生活中的难题，你总能表现得游刃有余。你在工作和学习中总能脱颖而出，是同伴们的榜样。你的潜力无限，只要你愿意，未来将为你敞开更多的机会之门。',
//         suggestion: '努力学习有助于提高智力哦~'
//     },
//     {
//         type: '常规智力',
//         description: '你的智力水平处于一个稳固的中间地带，表现出了坚实的学习和理解能力。你能够顺利应对生活和工作中的大多数挑战，适应力强，执行力佳。你有着健康的思维方式，能在必要时做出明智的决策。你在团队中是一位可靠的伙伴，既能独立完成任务，又能在需要时提供有力的支持。平衡和稳定是你最大的优势，让你在生活中始终立于不败之地。',
//         suggestion: '努力努力学习有助于提高智力哦~'
//     },
//     {
//         type: '潜力智者',
//         description: '你可能需要比别人付出更多的努力来达到目标，但这并不意味着你无法成功。相反，你拥有潜力，只需要多一点耐心和坚持。你在面对新的知识和挑战时，可能需要多花一点时间去理解和消化，但一旦掌握，你的记忆和应用能力是非常可靠的。你是一个有韧性的人，能够在逆境中找到自己的路。相信自己，你的努力终将得到回报。',
//         suggestion: '努力学习有助于提高智力哦~'
//     },
//     {
//         type: '智力探索者',
//         description: '你的智力可能会在一些复杂的任务中面临挑战，但你并非孤立无援。你有自己的强项和天赋，尤其是在某些特定的领域，你可以表现得非常出色。你可能需要更多的支持和帮助来应对生活中的某些方面，但你坚韧不拔的性格将成为你最大的优势。通过与他人合作和持续学习，你可以不断进步，找到最适合自己的发展道路。',
//         suggestion: '努力学习有助于提高智力哦~'
//     },
//     {
//         type: '智慧萌芽',
//         description: '你的智力在某些方面可能会遇到较大的困难，但这也意味着你拥有不同的视角和独特的优势。你可能需要更多的指导和帮助来应对日常生活中的挑战，但你也因此拥有了更多的机会去学习如何在逆境中成长。你的坚持和努力将帮助你克服种种障碍，找到属于你的成功之路。记住，每个人的智慧都有其独特的闪光点，而你的智慧正在萌芽，只待时日便可茁壮成长。',
//         suggestion: '努力学习有助于提高智力哦~'
//     }
// ];

//     // 定义分数范围  
//     const depressionScoreRanges = [{
//             min: 0,
//             max: 4
//         },
//         {
//             min: 5,
//             max: 7
//         },
//         {
//             min: 8,
//             max: 10
//         },
//         {
//             min: 11,
//             max: 13
//         }
//     ];

//     // 定义分数范围  
//     const intelligenceScoreRanges = [   
//     {
//         min: 130,
//         max: 160
//     },
//     {
//         min: 115,
//         max: 129
//     },
//     {
//         min: 100,
//         max: 114
//     },
//     {
//         min: 85,
//         max: 99
//     },
//     {
//         min: 70,
//         max: 84
//     },
//     {
//         min: 55,
//         max: 69
//     },
//     {
//         min: 0,
//         max: 54
//     }
// ];

//     // 假设人格测评的分数处理逻辑在这里实现（这里省略，因为具体逻辑会依赖测评内容）  
    

//     // 根据user_type和score返回结果  
//     if (user_type === 0) { // 抑郁测评  
//         for (let i = 0; i < depressionScoreRanges.length; i++) {
//             if (score >= depressionScoreRanges[i].min && score <= depressionScoreRanges[i].max) {
//                 return depressionResults[i]; // 返回对应分数范围的测评结果  
//             }
//         }
//     } else if (user_type === 2) { // 智力测评  
//         // 这里应该实现智力测评的分数处理逻辑，并返回相应的结果  
//         for (let i = 0; i < intelligenceScoreRanges.length; i++) {
//             if (score >= intelligenceScoreRanges[i].min && score <= intelligenceScoreRanges[i].max) {
//                 return intelligenceResults[i]; // 返回对应分数范围的测评结果  
//             }
//         }
//     } else if (user_type === 1) { // 人格测评  
//         for (let i = 0; i < depressionScoreRanges.length; i++) {
//             if (score >= depressionScoreRanges[i].min && score <= depressionScoreRanges[i].max) {
//                 return personalityResults[i]; // 返回对应分数范围的测评结果  
//             }
//         }
//     } else if(user_type === 3){ // 健康测评  

//     } else {
//         throw new Error('Invalid user_type');
//     }
// }

//获取 一条测试结果
getTestResult = (req, res) =>{
    let{
        user_type,
        user_score
    } = req.body;

    console.log('user_type:', user_type);
    console.log('user_type:',typeof user_type);
    console.log('user_score:', user_score);
    console.log('user_score:',typeof user_score);

    // 定义分数范围  
    const intelligenceScoreRanges = [   
        {
            min: 130,
            max: 160
        },
        {
            min: 115,
            max: 129
        },
        {
            min: 100,
            max: 114
        },
        {
            min: 85,
            max: 99
        },
        {
            min: 70,
            max: 84
        },
        {
            min: 55,
            max: 69
        },
        {
            min: 0,
            max: 54
        }
    ];

    // 定义分数范围  
    const peopleScoreRanges = [{
        min: 0,
        max: 4
    },
    {
        min: 11,
        max: 13
    },
    {
        min: 14,
        max: 16
    },
    {
        min: 17,
        max: 17
    }
];

    const depressionScoreRanges = [{
        min: 0,
        max: 4
    },
    {
        min: 5,
        max: 7
    },
    {
        min: 8,
        max: 10
    },
    {
        min: 11,
        max: 13
    }
    ];

    let type_id ;
    let sql; 
    let type = Number(user_type);
    // 根据user_type和score返回结果  
    if (user_type === 1) { // 抑郁测评  
        // 这里应该实现智力测评的分数处理逻辑，并返回相应的结果
        console.log('进入判断')  
        for (let i = 0; i < depressionScoreRanges.length; i++) {
            if (user_score >= depressionScoreRanges[i].min && user_score <= depressionScoreRanges[i].max) {
                type_id=i+1;
            }
        }
        console.log('type_id:',type_id);

    } else if (user_type === 3) { // 智力测评  
        // 这里应该实现智力测评的分数处理逻辑，并返回相应的结果
        console.log('进入判断')  
        for (let i = 0; i < intelligenceScoreRanges.length; i++) {
            if (user_score >= intelligenceScoreRanges[i].min && user_score <= intelligenceScoreRanges[i].max) {
                type_id=i+1;
            }
        }
        console.log('type_id:',type_id);
    } else if (user_type === 2) { // 人格测评  
        console.log('进入判断')  
        for (let i = 0; i < peopleScoreRanges.length; i++) {
            if (user_score >= peopleScoreRanges[i].min && user_score <= peopleScoreRanges[i].max) {
                type_id=i+1;
            }
        }
        console.log('type_id:',type_id);

    } else if(user_type === 4){ // 健康测评  

    } else {
        throw new Error('Invalid user_type');
    }

    sql=`SELECT * FROM test_result WHERE user_type = ${type} AND type_id = ${type_id};`;
            
        db.query(sql, async (err, data) => {
            if (err) {
                return res.json({
                       status: -1,
                       msg: '失败'
                })
                } else {
                    res.send({
                        "data": data,
                        "status": 200,
                        "msg": "成功"
                    });
                }
        })
}


// 获取 测评记录列表
getTestResultList = (req, res) => {
    let {
        user_id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值

    let sql;
    if (user_id) {
        sql = `select * from test_result_record where user_id = ${user_id}`
    } else {
        sql = `select * from test_result_record`
    }

    db.query(sql, async (err, data) => {
        if (err) {
            return res.json({
                status: -1,
                msg: '失败'
            })
        } else {

            res.send({
                "data": data,
                "status": 200,
                "msg": "成功"
            });
        }
    })
 }

// 获取 答题记录
// getScoreRecordList = (req, res) => {
//     let {
//         user_id
//     } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值

//     let sql;
//     if (user_id) {
//         sql = `select * from test_problem_record where user_id = ${user_id}`
//     } else {
//         sql = `select * from test_problem_record`
//     }

//     db.query(sql, async (err, data) => {
//         if (err) {
//             return res.json({
//                 status: -1,
//                 msg: '失败'
//             })
//         } else {

//             data = data.map(item => {
//                 return {
//                     ...item,
//                     objectTz: getTestResults(item.user_type, item.user_score)
//                 }
//             })

//             res.send({
//                 "data": data,
//                 "status": 200,
//                 "msg": "成功"
//             });
//         }
//     })
// }

//新增 测试结果
addTestResult = (req,res) => {
    let{
        user_id,
        user_name,
        user_score,
        update_time,
        test_type,
        test_result_type,
        description,
        suggestion

    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `INSERT INTO test_result_record (
        user_id,
        user_name,
        user_score,
        update_time,
        test_type,
        test_result_type,
        description,
        suggestion
      ) VALUES (
        ?,?,?,?,?,?,?,?
      )`;
    
    db.query(sql, [user_id, user_name, user_score, update_time, test_type, test_result_type, description, suggestion], function (err,
        data) {
            console.log(err, data, '====err, data');
            if (err) {
                res.send({
                    "status": 500,
                    "msg": err,
                });
            } else {
                res.send({
                    "msg": "新增成功",
                    "status": 200
                });
            }
        });

}


// 新增 答题记录
// addScoreRecordList = (req, res) => {
//     let {
//         user_id,
//         user_name,
//         user_url,
//         user_score,
//         user_desc,
//         update_time,
//         user_type
//     } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
//     let sql = `INSERT INTO test_problem_record (
//         user_id, 
//         user_name, 
//         user_url, 
//         user_score, 
//         user_desc, 
//         update_time, 
//         user_type
//       ) VALUES (
//         ?,?,?,?,?,?,?
//       )`;
//     db.query(sql, [user_id, user_name, user_url, user_score, user_desc, update_time, user_type], function (err, data) {
//         console.log(err, data, '====err, data');
//         if (err) {
//             res.send({
//                 "status": 500,
//                 "msg": err,
//             });
//         } else {
//             res.send({
//                 "msg": "新增成功",
//                 "status": 200
//             });
//         }
//     });
// }

// 更新 答题记录
updateScoreRecordList = (req, res) => {
    let {
        user_id,
        user_name,
        user_url,
        user_score,
        user_desc,
        update_time,
        user_type,
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值
    let sql = `update test_problem_record set user_id='${user_id}',
    user_name='${user_name}',
    user_url='${user_url}',
    user_score='${user_score}',
    user_desc='${user_desc}',
    update_time='${update_time}',
    user_type='${user_type}'
     where id = ${id}`;
    db.query(sql, function (err, data) {
        if (err) {
            res.send({
                msg: "更新失败 " + err,
                status: 500,
            });
        } else {
            res.send({
                msg: "更新成功",
                status: 200
            });
        }
    });
}

// 删除 答题记录
delScoreRecordList = (req, res) => {
    let {
        id
    } = req.body; // get请求在req.query中拿值，post请求在req.body中拿值

    let sql = `delete from test_test_record where id = ${id}`;

    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                "status": 500,
                "msg": "删除失败",
                "err": err
            })
        } else {
            res.send({
                "status": 200,
                "msg": "删除成功"
            })
        }
    });
}

module.exports = {
    getUser, // 获取所有的用户信息
    register, // 新增用户
    updateUser, // 修改用户接口,根据id修改用户
    deleteUser, // 删除用户,根据id删除用户
    signIn, // 登录接口
    getRankList, // 获取用户表内每个用户最新时间的数据
    getScoreList, // 获取当前用户的历史考试记录
    setStudentInfo, // 存储学生考试成绩接口
    getExamInfo, // 发题接口
    addActivity, // 新增活动推送
    updateActivity, // 修改活动推送
    delActivity, // 删除活动推送
    getActivity, // 获取活动推送
    addUserActivity, // 新增用户预约活动
    updateUserActivity, // 修改用户预约活动
    delUserActivity, // 删除用户预约活动
    getUserActivity, // 获取用户预约活动
    addClassTabs, // 新增分类tab
    updateClassTabs, // 修改分类tab
    delClassTabs, // 删除分类tab
    getClassTabs, // 获取分类tab 也就是分类title
    getAllClassContent, // 查询所有分类下的内容
    addAllClassContent, // 新增分类内容 向itemclassify表中插入数据
    editAllClassContent, // 修改分类内容 向itemclassify表中更新数据
    delAllClassContent, // 删除分类内容 向itemclassify表中删除数据
    getClassList, // 获取分类tab的内容 也就是每个分类下的内容
    addUserfavorite, // 新增用户收藏
    updateUserfavorite, // 修改用户收藏
    delUserfavorite, // 删除用户收藏
    getUserfavorite, // 获取用户收藏
    getShopEvaluate, // 查询文章评价 根据文章id
    addShopEvaluate, // 新增文章评价 根据用户id 文章id
    editShopEvaluate, // 修改文章评价 根据id
    delShopEvaluate, // 删除文章评价 向userevaluate表中删除数据
    
    getTimuList, // 获取 题目列表
    addTimuList, // 新增 题目列表
    updateTimuList, // 更新 题目列表
    delTimuList, // 删除 题目列表

    // getScoreRecordList, // 获取 答题记录列表
    getTestResult, //获取 一条测试结果
    getTestResultList, //获取 测试结果列表
    addTestResult, // 新增 测试结果
    // addScoreRecordList, // 新增 答题记录列表
    updateScoreRecordList, // 更新 答题记录列表
    delScoreRecordList, // 删除 答题记录列表
}