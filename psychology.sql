/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39)
 Source Host           : localhost:3306
 Source Schema         : psychology

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39)
 File Encoding         : 65001

 Date: 26/08/2024 10:09:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activitylist
-- ----------------------------
DROP TABLE IF EXISTS `activitylist`;
CREATE TABLE `activitylist`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `activity_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动标题',
  `activity_con` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动内容',
  `activity_time` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动时间',
  `activity_address` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动地址',
  `activity_tips` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动注意事项',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of activitylist
-- ----------------------------
INSERT INTO `activitylist` VALUES (1, '心理讲座', '为丰富校园化生活,进一步推动我校心理素质教育工作,提升大学生心理健康水平,引导广大学生认识自我、发展自我、欣赏自我、关爱自我,学会自我调适、自我规划', '2023/7/26', '武汉市体育中心', '记得携带水杯');
INSERT INTO `activitylist` VALUES (4, '心理剧大赛', '心理剧大赛是为了丰富我们的文化生活，提高..', '2023/08/01', '湖北省武汉市洪山区', '尽情发挥，活动有大奖噢');

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,此字段为分类的id',
  `class_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '分类的名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1, '婚恋');
INSERT INTO `classify` VALUES (2, '健康');
INSERT INTO `classify` VALUES (3, '职场');
INSERT INTO `classify` VALUES (4, '教育');
INSERT INTO `classify` VALUES (5, '性格');
INSERT INTO `classify` VALUES (13, '科普');

-- ----------------------------
-- Table structure for itemclassify
-- ----------------------------
DROP TABLE IF EXISTS `itemclassify`;
CREATE TABLE `itemclassify`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,也是商品唯一id',
  `usershop_id` int NULL DEFAULT NULL COMMENT '商户id,与users表的id是对应的',
  `class_id` int NULL DEFAULT NULL COMMENT '分类id,与classify表的id是对应的',
  `item_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '文章名称',
  `item_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '文章图片',
  `item_practice` varchar(10000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '文章内容',
  `update_time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '此数据生成的时间',
  `is_recommend` int NULL DEFAULT NULL COMMENT '是否推荐 0不推荐 1推荐',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of itemclassify
-- ----------------------------
INSERT INTO `itemclassify` VALUES (22, 1, 4, '正视：为什么如今孩子们的抑郁如此高发？', 'http://localhost:6008/routes/upload/20230715172630-9444150755b4448276a749e0f.png', '<p><span style=\"color: rgb(89, 89, 89);\">近年来，青少年抑郁人数大幅度增长，很多人都觉得不解：现在的孩子，拥有着比从前优越得的生活条件，可为什么许多都走向抑郁的道路？</span></p><p><span style=\"color: rgb(89, 89, 89);\">经常听见有人说：小孩子懂什么，哪有那么多难过？因为在成人的眼中，孩子是无忧无虑，没有烦恼的。面对孩子的抑郁，也有很多家长倾向于选择忽视或硬撑。</span></p><p><span style=\"color: rgb(89, 89, 89);\">殊不知孩子其实非常敏感，尤其在这个高信息时代，孩子们接收到的、感知到的要比家长想象中多得多。</span></p><p>......</p>', '2023-04-27 10:25:11', 0);
INSERT INTO `itemclassify` VALUES (23, 1, 13, '拥抱的力量——接触安慰', 'http://localhost:6008/routes/upload/20230715172503-9444150755b4448276a749e0e.png', '<p><span style=\"color: rgb(89, 89, 89);\">01</span></p><p><span style=\"color: rgb(89, 89, 89);\">接触安慰，你知道吗？</span></p><p><span style=\"color: rgb(89, 89, 89);\">研究发现：</span></p><p><span style=\"color: rgb(89, 89, 89);\">每天一两个拥抱产生的保健作用比每天吃一个苹果还要好，</span></p><p><span style=\"color: rgb(89, 89, 89);\">经常拥抱可减低心脏病风险，战胜压力和疲劳，提升免疫力，抗击炎症，以及缓解抑郁。</span></p><p><span style=\"color: rgb(76, 76, 76);\">......</span></p>', '2023-04-27 10:25:11', 0);
INSERT INTO `itemclassify` VALUES (24, 1, 13, '原来这就叫“空船理论”！ 帮你解决90%的问题', 'http://localhost:6008/routes/upload/20230715172416-9444150755b4448276a749e0d.png', '<p><span style=\"color: rgb(89, 89, 89);\">生活中的10％是由发生在你身上的事情组成，而另外的90％则是由你对所发生的事情如何反应所决定。</span></p><p><br></p><p><span style=\"color: rgb(89, 89, 89);\">换言之，生活中有10%的事情是我们无法掌控的，而另外的90%却是我们能掌控的。</span></p><p><br></p><p><strong style=\"color: rgb(89, 89, 89);\">01</strong></p><p><span style=\"color: rgb(89, 89, 89);\">美国社会心理学家费斯汀格在书中举了这样一个例子：</span></p><p><br></p><p><span style=\"color: rgb(89, 89, 89);\">卡斯丁早上起床后洗漱时，随手将自己高档手表放在洗漱台边，妻子怕被水淋湿了，就随手拿过去放在餐桌上。儿子起床后到餐桌上拿面包时，不小心将手表碰到地上摔坏了。</span></p><p><br></p><p><span style=\"color: rgb(89, 89, 89);\">......</span></p>', '2023-04-27 10:25:11', 0);
INSERT INTO `itemclassify` VALUES (25, 1, 13, '11个让你顿悟的心理小故事', 'http://localhost:6008/routes/upload/20230715172321-9444150755b4448276a749e0c.png', '<p><span style=\"color: rgb(89, 89, 89);\">01</span></p><p><span style=\"color: rgb(89, 89, 89);\">父子二人看到一辆十分豪华的进口轿车。儿子不屑地对他的父亲说:\"坐这种车的人，肚子里一定没有学问!\"父亲则轻描淡写地回答:\"说这种话的人，口袋里一定没有钱!\"</span></p><p><span style=\"color: rgb(89, 89, 89);\">你对事情的看法，是不是也反映出你内心真正的态度?</span></p><p><span style=\"color: rgb(89, 89, 89);\">02</span></p><p>......</p>', '2023-04-27 10:25:11', 0);
INSERT INTO `itemclassify` VALUES (26, 1, 13, '余光中：《写给未来的你》写给每一个孩子，也写给你！', 'http://localhost:6008/routes/upload/20230715172226-9444150755b4448276a749e0b.png', '<p>据台媒报道,台湾文学家、著名诗人余光中病逝,享年90岁,代表作《乡愁》、《白玉苦瓜》等。</p><p>这是一个大师逝去的时代。</p><p>余老的这首诗歌写给每一个孩子,也写给你!</p><p>写给未来的你</p><p><br></p><p><strong style=\"color: rgb(255, 0, 0);\">孩子,</strong></p><p><strong style=\"color: rgb(255, 0, 0);\">我希望你自始至终都是一个理想主义者。</strong></p><p>你可以是农民,</p><p>可以是工程师,</p><p>可以是演员,</p><p><span style=\"color: rgb(76, 76, 76);\">......</span></p>', '2023-04-27 10:25:11', 0);
INSERT INTO `itemclassify` VALUES (27, 1, 13, '旅行是最好的心理治疗', 'http://localhost:6008/routes/upload/20230715172127-9444150755b4448276a749e0a.png', '<p><span style=\"color: rgb(89, 89, 89);\">旅行会让人谦卑，你会知道地球之大，永远有着与你截然不同的人、事、物在地球的彼端发生。</span></p><p><span style=\"color: rgb(89, 89, 89);\">见的世面广了，也就不会把自己局限在小格局里，不再愤世嫉俗，与人为敌。</span></p><p><span style=\"color: rgb(89, 89, 89);\">所以，旅行永远是最好、最有效的心理治疗。</span></p><p><span style=\"color: rgb(89, 89, 89);\">现在这一观点得到了心理科学的支持!</span></p><p><span style=\"color: rgb(89, 89, 89);\">......</span></p>', '2023-04-27 11:13:24', 1);
INSERT INTO `itemclassify` VALUES (28, 1, 13, '九型人格测试 | 探索未知的自己', 'http://localhost:6008/routes/upload/20230715172041-9444150755b4448276a749e09.png', '<p>我怎么知道自己适合什么工作？</p><p>我最擅长的能力是什么？</p><p>如何与同事，老板融洽相处？</p><p>我是否真正了解伴侣的真实需求？</p><p>我为什么会做这些事，行为背后的动机是什么？</p><p>......</p><p>上述的迷惘其实都与「性格」息息相关，对于个体而言，性格对职业的选择和个人的发展有着千丝万缕的关系。</p><p><strong>俗话说，「性格决定命运」。</strong></p><p>那么，该怎样去挖掘性格特质，成为更优秀的自己呢？为你推荐九型人格测试。</p><p>九型人格是一门非常精准的性格心理学，近二十几年，已风行学术界及工商界，是许多国际著名大学MBA/EMBA学员推崇的热门课程之一，越来越多的全球500强企业的管理阶层在研习九型人格。</p><p>九型人格是一种深层次了解人的方法和学问，它按照人们的思维、情绪和行为，将人分为九种：完美主义者、给予者、实干者、悲情浪漫者、观察者、怀疑者、享乐主义者、调停者、保护者。</p>', '2023-04-27 09:41:34', 1);
INSERT INTO `itemclassify` VALUES (29, 1, 3, '人际交往心理学的24黄金法则', 'http://localhost:6008/routes/upload/20230715171928-9444150755b4448276a749e08.png', '<p><span style=\"color: rgb(89, 89, 89);\">心理学家研究发现，在人际交往中存在一些基本的准则，这些准则的掌握将有助于你在人际交往中获得良好的收益。当我们遵照这些法则行事的时候，我们就能增加自己的关系账户上的财富。</span></p><p><span style=\"color: rgb(89, 89, 89);\">1、尽可能鼓励别人。</span></p><p><span style=\"color: rgb(89, 89, 89);\">......</span></p>', '2023-04-27 12:44:13', 1);
INSERT INTO `itemclassify` VALUES (30, 1, 3, '面对五类“问题”朋友，你要懂得拒绝！', 'http://localhost:6008/routes/upload/20230715171825-9444150755b4448276a749e07.png', '<p><span style=\"color: rgb(63, 63, 63);\">友谊是人们在交往活动中产生的一种特殊情感，友谊是大自然的一抹色彩，独具慧眼的匠师才能把它表现得尽善尽美；友谊是乐谱上的一个跳动音符，感情细腻的歌唱者才能把它表达得至真至纯。</span></p><p><span style=\"color: rgb(63, 63, 63);\">可是，你有过这样的体验吗？本来心理爽朗、兴冲冲地去赴友人之约，最后却败兴而归。有些人会因此自责，其实不尽然，问题也可能出在朋友身上。据美国研究者称，有些朋友的言行会让你感到筋疲力尽、灰心丧气。研究者因此提醒人们，最好不要和这五类人走得太近。</span></p><p><span style=\"color: rgb(76, 76, 76);\">......</span></p>', '2023-04-27 12:48:31', 0);
INSERT INTO `itemclassify` VALUES (31, 1, 3, '4个心理小技巧，提升你的交际能力！', 'http://localhost:6008/routes/upload/20230715171725-9444150755b4448276a749e06.png', '<p><strong>如何巧妙地聆听别人?</strong></p><p>聆听越多,你就会被更多的人信任,就会成为更好的谈话伙伴。当然,成为一名好的听众,并非一件容易的事,这里有5点建议可供参考:</p><p>1、注视说话人</p><p>2、靠近说话者,专心致志地听</p><p>3、提问</p><p>4、不要打断说话者的话题</p><p>5、使用说话者的人称——“您”和“您的”</p><p><br></p><p><strong>如何巧妙地影响别人?</strong></p><p>......</p>', '2023-04-27 13:52:09', 1);
INSERT INTO `itemclassify` VALUES (32, 1, 2, '解密：人为什么会心烦？', 'http://localhost:6008/routes/upload/20230715171619-9444150755b4448276a749e05.png', '<p><span style=\"color: rgb(89, 89, 89);\">人们有个表示烦躁的口头禅：“烦死了”。从心理学与脑科学分析，容易烦躁实质上是一种类似于脑损伤引起的后遗症的行为或情绪，对人类健康极为不利。</span></p><p><span style=\"color: rgb(89, 89, 89);\">对很多人来说，烦闷不过是一种短暂、几乎微不足道的情绪，很容易消散，比如某项工作任务一完成，或某个讲座刚结束的时刻，这种情绪很快就烟消云散了。但是，烦闷还有更不好的一面：很容易出现烦闷情绪的人。</span></p><p><span style=\"color: rgb(89, 89, 89);\">有下列症状或行为的危险系数也较高</span><span style=\"color: rgb(255, 0, 0);\">......</span></p><p><span style=\"color: rgb(255, 0, 0);\">......</span></p>', '2023-04-27 13:55:12', 1);
INSERT INTO `itemclassify` VALUES (33, 1, 2, '11条心理学建议助你减少焦虑', 'http://localhost:6008/routes/upload/20230715171528-9444150755b4448276a749e04.png', '<p>前段时间读过一本书，书中有个观点是焦虑本身是正常现象，但我们的大脑会对负面情绪的关注更多，一定要想办法去转移你注意力，要不然你会一定沉浸负面情绪中，当你把焦点放到其它事情上，你将能改变你的精神状态。</p><p>心理学家们总结了一些可以在日常生活中很容易做到行为，一共十一条。</p><p>图片</p><p>01</p><p>喝一杯茶</p><p>红茶和绿茶都含有一种叫作L-茶氨酸（L-theanine）的氨基酸。它可以刺激α脑波，让大脑处于平静又警觉的状态。</p><p>坐下来，好好享受围绕在你身边的温暖安静，问问自己：“我的激情是什么？”</p><p>02</p><p>在一处流水前坐下</p><p>......</p>', '2023-04-27 15:10:16', 1);
INSERT INTO `itemclassify` VALUES (34, 1, 2, 'CoCo李玟离开了，而我们还要继续前行', 'http://localhost:6008/routes/upload/20230715171419-9444150755b4448276a749e03.png', '<p><span style=\"color: rgb(89, 89, 89);\">中国抑郁症患者的现状是：当下中国社会抑郁症患者突增，疫情后时代的各种人受到的抑郁压力形成病症。主要是年轻的上班族找不到生活的方向，青少年长期压力的形成，特殊优秀人群的生存环境压力，以及原生家庭问题遗传。抑郁症问题繁杂，个人各样，就需要以整合心理学的方式介入理解和以整合治疗的方式参与治疗。整合心理学以超个人的方式，尤其是将人作为“全人”，在关注人整体的身心健康方面，东西方文化已然有了共通之处。身心合一就是整合心理学方法中的一个重要部分。</span></p><p>......</p>', '2023-04-27 15:11:12', 0);
INSERT INTO `itemclassify` VALUES (35, 1, 1, '你会陪一个男人长大么？', 'http://localhost:6008/routes/upload/20230715171251-9444150755b4448276a749e02.png', '<p><span style=\"color: rgb(89, 89, 89);\">这篇文章不仅仅是写给单身的菇凉的，更是写给已婚和恋爱中的姐妹们。在陪伴男人长大的话题中，人人都有bug 的。我们都如一台有灵魂的机器，修一修都能用。</span></p><p><br></p><p><span style=\"color: rgb(89, 89, 89);\">你说为什么现在越来越多的女孩子，不愿意降低要求找对象呢？我问过身边条件不错的小姐妹，她说因为没必要。我问你为何不愿意在这样的年纪20几岁找一个潜力股呢？搏一把，万一成功了呢！她说：搏了不一定能赢；但不博一定不会输。不输都已经很难了，我那里还敢说一定会赢！一句话把天聊死了。</span>......</p>', '2023-04-27 15:15:29', 0);
INSERT INTO `itemclassify` VALUES (36, 1, 5, '心理研究：内向性格能带给别人安全感', 'http://localhost:6008/routes/upload/20230715171143-9444150755b4448276a749e01.png', '<p><span style=\"color: rgb(89, 89, 89);\">很多内向者都想自己变得外向一些，想让自己变得完美固然重要。但其实外向者也有自己性格上的缺点，也有羡慕内向者的地方。人无完人，每种性格都有各自的优缺点，内向者也可以带给身边人安全感，譬如诚实、知心、宽容等。</span></p><p><strong style=\"color: rgb(89, 89, 89);\">&nbsp;01&nbsp;&nbsp;</strong></p><p><strong style=\"color: rgb(89, 89, 89);\">内向性格者：与生俱来的诚实给人好感</strong></p><p><span style=\"color: rgb(89, 89, 89);\">......</span></p>', '2023-04-27 15:17:36', 1);
INSERT INTO `itemclassify` VALUES (37, 1, 1, '垃圾婚姻的6大定律，你中招了吗？', 'http://localhost:6008/routes/upload/20230715170952-9444150755b4448276a749e00.png', '<p>有一种婚姻，我想称之为垃圾婚姻。</p><p>\"垃圾婚姻\"通常是指一段不幸的婚姻关系，其中充满了争吵、不满和不健康的行为。虽然有些人可能认为这种说法有些过于严重，但是据研究显示，垃圾婚姻确实存在一些普遍的特征。</p><p>缺乏沟通</p><p>缺乏沟通是垃圾婚姻中最常见的问题之一。夫妻之间经常沉默寡言，不愿意分享自己的想法和感受。这种缺乏沟通的状态会让婚姻关系变得冷漠和疏离。缺乏沟通会导致很多问题，如家庭暴力、争吵和离婚等。</p><p>互相指责</p><p>垃圾婚姻中的另一个问题就是互相指责。夫妻之间经常互相指责，指责对方的错误和缺点，而不是考虑如何改善自己的婚姻关系。这种行为会导致夫妻之间的矛盾和不满，进而影响到婚姻关系的健康。</p><p>没有共同目标</p><p>......</p>', '2023-04-27 15:27:39', 1);
INSERT INTO `itemclassify` VALUES (38, 1, 13, '所谓安全感，就是选择权', 'http://localhost:6008/routes/upload/20230714180452-af58f698fc63602ea9c4b8c00.png', '<p class=\"ql-align-center\">安全感，是心灵的港湾</p><p class=\"ql-align-center\">选择权，是人生的方向盘</p><p class=\"ql-align-center\">在这纷繁世界中漫步</p><p class=\"ql-align-center\">我们渴望一份安宁与宁静</p><p class=\"ql-align-center\">安全感，如同阳光洒在大地</p><p class=\"ql-align-center\">......</p><p><br></p>', '2023-04-27 15:29:50', 0);
INSERT INTO `itemclassify` VALUES (39, 1, 1, '那些缺乏安全感的孩子，到底需要怎样的爱？', 'http://localhost:6008/routes/upload/20230714164300-a2a2cb26726f5de1e547b8100.png', '<p>前几天我送小侄子去幼儿园。</p><p>在门口我看到一个小男孩,抱着妈妈哭得撕心裂肺。我在想,都开学快一个月了,为什么这个小男孩还没适应呢?</p><p>这时小男孩的妈妈被哭得很不耐烦,把他的小胳膊甩开:“别再哭了,再哭妈妈就不要你了!”</p><p>结果小男孩哭得更凶了。</p><p><strong>“再哭妈妈就不要你了!”</strong>多刺耳的话,因为这句话,让这个小男孩内心毫无安全感。</p><p>在他的心里,真的相信妈妈会抛弃他。对他来说,每一次去幼儿园,都意味着被抛弃。不哭才怪呢。</p><p>......</p>', '2023-04-27 15:32:09', 0);

-- ----------------------------
-- Table structure for jieguo
-- ----------------------------
DROP TABLE IF EXISTS `jieguo`;
CREATE TABLE `jieguo`  (
  `id` int NOT NULL,
  `timu_id` int NULL DEFAULT NULL COMMENT '题目id 与timu表里面是对应联动的',
  `optionname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '选项naem',
  `optionval` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '选项value',
  `tips` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '温暖小贴士',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of jieguo
-- ----------------------------
INSERT INTO `jieguo` VALUES (1, 1, '好', 'A', '天晴得像一张蓝纸，几片薄薄的白云，像被阳光晒化了似的，随风缓缓浮游着。');
INSERT INTO `jieguo` VALUES (2, 1, '很好', 'B', '天晴了，和煦的风吹拂着我的脸，温暖的阳光照耀着大地，照在我们身上，暖暖的，舒服极了');
INSERT INTO `jieguo` VALUES (3, 1, '非常好', 'C', '雨过天晴，空气清新。绿叶葱葱，草儿油油。乡间小路，带点泥泞，茂密的丛林中，有些许鸟儿在欢歌。');
INSERT INTO `jieguo` VALUES (4, 1, '非常非常好', 'D', '窗外边的山景色很美，坐在窗边很凉爽。但蓝色的天空抵不过黑云。该是晴朗的天气却偏偏乌云密布。');
INSERT INTO `jieguo` VALUES (5, 2, '吃了', 'A', '嗯嗯，乖乖吃饭的你，也很棒喔');
INSERT INTO `jieguo` VALUES (6, 2, '还没有', 'B', '记得好好吃饭，我有在想你的');
INSERT INTO `jieguo` VALUES (7, 3, '吃了', 'A', '维C满满的一天诶，加油~');
INSERT INTO `jieguo` VALUES (8, 3, '还没有', 'B', '我打开石榴一看，籽儿好红呀！一粒连着一粒，粒粒都像粉红色的水晶石。把桂圆凑近嘴边，用手一捏表皮，桂圆就会“扑溜”一声滑进嘴里，轻轻一咬，嘴里顿时灌满了新鲜的汁水，甜津津的，细腻爽口。青青的杏儿，咬一下，会酸得你直流口水；等到它变黄变红，就会软软的、甜甜的，略有点酸味儿，咬一口，沁人心脾，令人陶醉。熟透了的柿子握在手里软软的，只需轻轻撕掉一点皮，放在嘴边一吸，就会吸到比蜜还甜的红色汁水，从嘴角一直甜到心里。沙枣熟了，一串串深褐色的小枣，有点像江南的桑葚，咬开来，真是一嘴沙，然而这沙是湿润的，有点涩，也有点儿甜。清爽的青苹果，爽口，咬下去好像带着一点点刺一样，麻麻的，带着稍微刺激的酸酸的味道，就好象我们无知的单纯的意识，活力而自信。从果园里飘出一阵阵醉人的芳香。你亲口尝尝那红通通的苹果，又甜又脆，好吃极了！小心翼翼地揭开黄到发红的耀眼的橘子皮，触目是饱满晶莹的果肉，扒一块，甜中带点微微的酸，仿佛要把整个人化开。切开瓜，香气扑鼻，有点像奶油味，还带点柠檬的清香。瓜瓤黄黄的，吃到嘴里，甜到心里。把哈密瓜切成小块，再倒进酸奶，可以做成酸甜可口的沙拉;把哈密瓜和牛奶放进搅拌机打碎，还可以做成香甜的哈密瓜奶昔。西红柿更不逊色，撑着阏滚滚水灵灵的身子反射出光泽，红的娇艳，黄的热烈。那现在，你想吃了嘛？');
INSERT INTO `jieguo` VALUES (9, 4, '我很好', 'A', '是的，我知道');
INSERT INTO `jieguo` VALUES (10, 4, '还不错', 'B', '哎哟，我也是');
INSERT INTO `jieguo` VALUES (11, 5, '我爱你', 'A', '我爱你，真情如履寒冰，深爱至极，又似暖阳，沁人心脾');
INSERT INTO `jieguo` VALUES (12, 5, '微臣附议', 'B', '我爱你，就像鱼儿爱着大海，苍鹰爱着天空，花草爱着大地');
INSERT INTO `jieguo` VALUES (13, 5, '微臣附议', 'C', '我爱你，千山万水、天涯海角，都挡不住我爱你的脚步');
INSERT INTO `jieguo` VALUES (14, 5, '微臣附议', 'D', '我也爱你');

-- ----------------------------
-- Table structure for studentinfo
-- ----------------------------
DROP TABLE IF EXISTS `studentinfo`;
CREATE TABLE `studentinfo`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,用于排名',
  `student_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '考生ID',
  `student_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '考生姓名',
  `curscore` int NOT NULL COMMENT '考生本次考试分数',
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '考生本次考试交卷时间',
  `answertime` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '考生本次考试所用时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 68 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of studentinfo
-- ----------------------------
INSERT INTO `studentinfo` VALUES (48, '1', 'admin', 100, '2022/04/08 22:01:56', '0分30秒');
INSERT INTO `studentinfo` VALUES (49, '3', '12345678912', 90, '2022/04/08 22:20:28', '0分54秒');
INSERT INTO `studentinfo` VALUES (50, '4', '13199998520', 80, '2022/04/15 23:04:14', '0分33秒');
INSERT INTO `studentinfo` VALUES (51, '4', '13199998520', 70, '2022/04/15 23:06:46', '0分23秒');
INSERT INTO `studentinfo` VALUES (52, '1', 'admin', 100, '2023/07/30 02:20:20', '0分29秒');
INSERT INTO `studentinfo` VALUES (53, '1', 'admin', 100, '2023/07/30 02:50:09', '0分42秒');
INSERT INTO `studentinfo` VALUES (54, '1', 'admin', 20, '2024/08/15 11:21:45', '0分11秒');
INSERT INTO `studentinfo` VALUES (55, '1', 'admin', 80, '2024/08/15 11:23:39', '0分28秒');
INSERT INTO `studentinfo` VALUES (56, '1', 'admin', 320, '2024/08/15 11:24:26', '0分18秒');
INSERT INTO `studentinfo` VALUES (57, '1', 'admin', 40, '2024/08/15 17:07:31', '0分12秒');
INSERT INTO `studentinfo` VALUES (58, '1', 'admin', 20, '2024/08/16 09:51:25', '0分10秒');
INSERT INTO `studentinfo` VALUES (59, '1', 'admin', 20, '2024/08/19 11:24:37', '0分12秒');
INSERT INTO `studentinfo` VALUES (60, '1', 'admin', 20, '2024/08/19 17:10:12', '0分10秒');
INSERT INTO `studentinfo` VALUES (61, '1', 'admin', 140, '2024/08/19 17:11:07', '0分30秒');
INSERT INTO `studentinfo` VALUES (62, '1', 'admin', 0, '2024/08/20 10:23:59', '0分3秒');
INSERT INTO `studentinfo` VALUES (63, '1', 'admin', 20, '2024/08/20 14:24:27', '0分11秒');
INSERT INTO `studentinfo` VALUES (64, '1', 'admin', 240, '2024/08/20 14:25:15', '0分31秒');
INSERT INTO `studentinfo` VALUES (65, '1', 'admin', 100, '2024/08/20 14:35:12', '9分40秒');
INSERT INTO `studentinfo` VALUES (66, '1', 'admin', 180, '2024/08/21 18:31:21', '0分14秒');
INSERT INTO `studentinfo` VALUES (67, '1', 'admin', 160, '2024/08/22 16:34:57', '0分27秒');

-- ----------------------------
-- Table structure for test_problem
-- ----------------------------
DROP TABLE IF EXISTS `test_problem`;
CREATE TABLE `test_problem`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,此字段为题目的id',
  `problem_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '题目',
  `problem_option` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '选项',
  `problem_type` int NULL DEFAULT NULL COMMENT '题目类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of test_problem
-- ----------------------------
INSERT INTO `test_problem` VALUES (17, '比以前更喜欢社交或外出，或经常半夜还给朋友发微信？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (18, '感觉脑子灵活，反应速度比平时快，或思维活跃？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (19, '性兴趣比平时更加旺盛？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (20, '易于动怒，经常以高声指责他人、频繁卷入争执甚至冲突中？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (21, '精力旺盛，没有疲劳感？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (22, '最近别人总说我做事不妥，如：鲁莽、愚蠢、冒险？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (23, '比平时说话多，或说话速度比平时快？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (24, '比平时积极主动，或比平时做了更多的事？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (25, '注意力不集中，容易被周围环境干扰？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (26, '睡得比平时少，而且经常不想睡？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (27, '比平时更加自信？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (28, '处于异乎寻常的“极度开心”状态，别人说我反常，而且这种亢奋给我带来麻烦？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (29, '过度消费，以至于令自己或家庭陷入了经济困境？', '[{\"option_name\":\"是\",\"option_score\":\"1\"},{\"option_name\":\"否\",\"option_score\":\"0\"}]', 1);
INSERT INTO `test_problem` VALUES (30, '选出不同类的一项：', '[{\"option_name\":\"蛇\",\"option_score\":\"0\"},{\"option_name\":\"大树\",\"option_score\":\"4\"},{\"option_name\":\"老虎\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (31, '在下列分数中，选出不同类的一项：', '[{\"option_name\":\"3/5\",\"option_score\":\"0\"},{\"option_name\":\"3/7\",\"option_score\":\"0\"},{\"option_name\":\"3/9\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (32, '男孩对男子，正如女孩对____', '[{\"option_name\":\"青年\",\"option_score\":\"0\"},{\"option_name\":\"孩子\",\"option_score\":\"0\"},{\"option_name\":\"夫人\",\"option_score\":\"0\"},{\"option_name\":\"妇女\",\"option_score\":\"5\"},{\"option_name\":\"姑娘\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (33, '如果笔相对于写字，那么书相对于_____', '[{\"option_name\":\"娱乐\",\"option_score\":\"0\"},{\"option_name\":\"阅读\",\"option_score\":\"5\"},{\"option_name\":\"学习\",\"option_score\":\"0\"},{\"option_name\":\"睡觉\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (34, '马之于马厩，正如人之于____', '[{\"option_name\":\"牛棚\",\"option_score\":\"0\"},{\"option_name\":\"马车\",\"option_score\":\"0\"},{\"option_name\":\"房屋\",\"option_score\":\"5\"},{\"option_name\":\"农场\",\"option_score\":\"0\"},{\"option_name\":\"楼房\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (35, '“ 2  8  14  20  ___ ” 请写出 “___” 处的数字。', '[{\"option_name\":\"24\",\"option_score\":\"0\"},{\"option_name\":\"25\",\"option_score\":\"0\"},{\"option_name\":\"26\",\"option_score\":\"5\"},{\"option_name\":\"27\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (36, '下列四个词可以组成一个正确的句子吗？生活/水里/鱼/在', '[{\"option_name\":\"可以\",\"option_score\":\"5\"},{\"option_name\":\"不能\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (37, '下列六个词可以组成一个句子吗？球棒/的/用来/是/棒球/打', '[{\"option_name\":\"可以\",\"option_score\":\"5\"},{\"option_name\":\"不能\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (38, '动物学家与社会学家对应，正如动物与_____相对', '[{\"option_name\":\"社会\",\"option_score\":\"5\"},{\"option_name\":\"社会学\",\"option_score\":\"0\"},{\"option_name\":\"人类\",\"option_score\":\"0\"},{\"option_name\":\"动物学\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (39, '如果所有的妇女都有大衣，那么漂亮的妇女会有：', '[{\"option_name\":\"更多的大衣\",\"option_score\":\"0\"},{\"option_name\":\"漂亮的大衣\",\"option_score\":\"5\"},{\"option_name\":\"大衣\",\"option_score\":\"0\"},{\"option_name\":\"昂贵的大衣\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (40, '{ 1  3  2  4  6  5  7  ___ } 请选出 ___ 处的数字', '[{\"option_name\":\"8\",\"option_score\":\"0\"},{\"option_name\":\"9\",\"option_score\":\"5\"},{\"option_name\":\"10\",\"option_score\":\"0\"},{\"option_name\":\"11\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (41, '南之于西北，正如西之于：', '[{\"option_name\":\"西北\",\"option_score\":\"0\"},{\"option_name\":\"东北\",\"option_score\":\"5\"},{\"option_name\":\"西南\",\"option_score\":\"0\"},{\"option_name\":\"东南\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (42, '找出不同类的一项', '[{\"option_name\":\"铁锅\",\"option_score\":\"0\"},{\"option_name\":\"饭勺\",\"option_score\":\"0\"},{\"option_name\":\"米饭\",\"option_score\":\"5\"},{\"option_name\":\"饭碗\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (43, '{ 9  7  8  6  7  5  ___ } 请选出 ___ 处的数字', '[{\"option_name\":\"6\",\"option_score\":\"5\"},{\"option_name\":\"7\",\"option_score\":\"0\"},{\"option_name\":\"5\",\"option_score\":\"0\"},{\"option_name\":\"5\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (44, '找出不同类的一项', '[{\"option_name\":\"沙发\",\"option_score\":\"0\"},{\"option_name\":\"书桌\",\"option_score\":\"0\"},{\"option_name\":\"书架\",\"option_score\":\"0\"},{\"option_name\":\"电视\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (45, '哪项该填在XOOOOXXOOOXXX后面', '[{\"option_name\":\"XOO\",\"option_score\":\"0\"},{\"option_name\":\"OOX\",\"option_score\":\"0\"},{\"option_name\":\"XOX\",\"option_score\":\"0\"},{\"option_name\":\"OXX\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (46, '望子成龙的家长往往 ___ 苗助长', '[{\"option_name\":\"揠\",\"option_score\":\"5\"},{\"option_name\":\"堰\",\"option_score\":\"0\"},{\"option_name\":\"偃\",\"option_score\":\"0\"},{\"option_name\":\"郾\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (47, '填上空缺的词，金黄的头发（黄山）刀山火海，赞美人生（____)卫国战争', '[{\"option_name\":\"美国\",\"option_score\":\"5\"},{\"option_name\":\"美战\",\"option_score\":\"0\"},{\"option_name\":\"国人\",\"option_score\":\"0\"},{\"option_name\":\"卫生\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (48, '选出不同类的一项', '[{\"option_name\":\"壁橱\",\"option_score\":\"0\"},{\"option_name\":\"橱窗\",\"option_score\":\"0\"},{\"option_name\":\"窗帘\",\"option_score\":\"0\"},{\"option_name\":\"墙壁\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (49, '{ 1  8  27  ___ }请选出 ___ 处的数字', '[{\"option_name\":\"39\",\"option_score\":\"0\"},{\"option_name\":\"54\",\"option_score\":\"0\"},{\"option_name\":\"64\",\"option_score\":\"5\"},{\"option_name\":\"81\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (50, '填上空缺的词，罄竹难书（书法）无法无天，作奸犯科（ ___ ）教学相长', '[{\"option_name\":\"奸相\",\"option_score\":\"0\"},{\"option_name\":\"奸长\",\"option_score\":\"0\"},{\"option_name\":\"教科\",\"option_score\":\"0\"},{\"option_name\":\"科学\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (51, '在括号内填一个字，使其与括号前的字组成一个词，同时又与括号后的字也能组成一个词：款（ ___ ）样', '[{\"option_name\":\"钱\",\"option_score\":\"0\"},{\"option_name\":\"式\",\"option_score\":\"5\"},{\"option_name\":\"待\",\"option_score\":\"0\"},{\"option_name\":\"字\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (52, '填入空缺的字母 B F  K  Q  ( ___ )', '[{\"option_name\":\"R\",\"option_score\":\"0\"},{\"option_name\":\"T\",\"option_score\":\"0\"},{\"option_name\":\"X\",\"option_score\":\"5\"},{\"option_name\":\"Z\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (53, '选择空缺的数字 16 (96) 12 | 10 ( ___ )  15', '[{\"option_name\":\"43\",\"option_score\":\"0\"},{\"option_name\":\"65\",\"option_score\":\"0\"},{\"option_name\":\"75\",\"option_score\":\"5\"},{\"option_name\":\"91\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (54, '找出不同类的一项', '[{\"option_name\":\"斑马\",\"option_score\":\"0\"},{\"option_name\":\"骏马\",\"option_score\":\"0\"},{\"option_name\":\"赛马\",\"option_score\":\"0\"},{\"option_name\":\"驸马\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (55, '今天吃啥了', '[{\"option_name\":\"西瓜\",\"option_score\":\"5\"},{\"option_name\":\"窝瓜\",\"option_score\":\"2\"},{\"option_name\":\"麻瓜\",\"option_score\":\"6\"},{\"option_name\":\"傻瓜\",\"option_score\":\"8\"}]', 2);
INSERT INTO `test_problem` VALUES (56, '几匹马', '[{\"option_name\":\"一匹\",\"option_score\":\"6\"},{\"option_name\":\"两匹\",\"option_score\":\"7\"},{\"option_name\":\"三匹\",\"option_score\":\"8\"},{\"option_name\":\"四匹\",\"option_score\":\"9\"}]', 2);
INSERT INTO `test_problem` VALUES (57, '工工人人人工人对于2211121相当于工工人人工人人工对于', '[{\"option_name\":\"22122112\",\"option_score\":\"0\"},{\"option_name\":\"22112122\",\"option_score\":\"0\"},{\"option_name\":\"22112112\",\"option_score\":\"5\"},{\"option_name\":\"11221221\",\"option_score\":\"0\"},{\"option_name\":\"21221121\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (58, '找出与众不同的一个', '[{\"option_name\":\"铝\",\"option_score\":\"0\"},{\"option_name\":\"锡\",\"option_score\":\"0\"},{\"option_name\":\"钢\",\"option_score\":\"5\"},{\"option_name\":\"铁\",\"option_score\":\"0\"},{\"option_name\":\"铜\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (59, '全班学生排成一行，从左数和从右数沃斯都是第15名，问全班共有学生多少人？', '[{\"option_name\":\"15\",\"option_score\":\"0\"},{\"option_name\":\"25\",\"option_score\":\"0\"},{\"option_name\":\"29\",\"option_score\":\"5\"},{\"option_name\":\"30\",\"option_score\":\"0\"},{\"option_name\":\"31\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (60, '五个答案中哪一个是最好的类比？脚对应手 相当于 腿对于 ___', '[{\"option_name\":\"肘\",\"option_score\":\"0\"},{\"option_name\":\"膝\",\"option_score\":\"0\"},{\"option_name\":\"臂\",\"option_score\":\"5\"},{\"option_name\":\"手指\",\"option_score\":\"0\"},{\"option_name\":\"脚趾\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (61, '如果所有的甲是乙，没有一个乙是丙，那么，一定没有一个丙是甲。这句话是：', '[{\"option_name\":\"对的\",\"option_score\":\"5\"},{\"option_name\":\"错的\",\"option_score\":\"0\"},{\"option_name\":\"既不对也不错\",\"option_score\":\"0\"}]', 3);
INSERT INTO `test_problem` VALUES (62, '沃斯比乔丹大，麦瑞比沃斯小。下列陈述中哪一家是正确的？', '[{\"option_name\":\"麦瑞比乔丹大\",\"option_score\":\"0\"},{\"option_name\":\"麦瑞比乔丹小\",\"option_score\":\"0\"},{\"option_name\":\"麦瑞与乔丹一样大\",\"option_score\":\"0\"},{\"option_name\":\"无法确定麦瑞与乔丹谁大\",\"option_score\":\"5\"}]', 3);
INSERT INTO `test_problem` VALUES (63, '“预杉” 对于 “须杼“ 相当于8326对于___', '[{\"option_name\":\"2368\",\"option_score\":\"0\"},{\"option_name\":\"6238\",\"option_score\":\"0\"},{\"option_name\":\"2683\",\"option_score\":\"0\"},{\"option_name\":\"6328\",\"option_score\":\"5\"},{\"option_name\":\"3628\",\"option_score\":\"0\"}]', 3);

-- ----------------------------
-- Table structure for test_problem_record
-- ----------------------------
DROP TABLE IF EXISTS `test_problem_record`;
CREATE TABLE `test_problem_record`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,此字段为答题记录的id',
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `user_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `user_score` int NULL DEFAULT NULL COMMENT '用户分数',
  `user_desc` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户报告',
  `update_time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '测试时间',
  `user_type` int NULL DEFAULT NULL COMMENT '用户测试题目类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 223 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of test_problem_record
-- ----------------------------
INSERT INTO `test_problem_record` VALUES (175, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 10:25:51', 1);
INSERT INTO `test_problem_record` VALUES (176, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 10:27:37', 1);
INSERT INTO `test_problem_record` VALUES (177, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 9, '', '2024/08/22 10:37:44', 1);
INSERT INTO `test_problem_record` VALUES (179, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 9, '', '2024/08/22 10:38:15', 1);
INSERT INTO `test_problem_record` VALUES (180, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 10:38:52', 1);
INSERT INTO `test_problem_record` VALUES (181, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 10:52:48', 1);
INSERT INTO `test_problem_record` VALUES (182, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 109, '', '2024/08/22 14:14:49', 2);
INSERT INTO `test_problem_record` VALUES (183, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 109, '', '2024/08/22 14:24:32', 2);
INSERT INTO `test_problem_record` VALUES (184, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/22 14:26:37', 1);
INSERT INTO `test_problem_record` VALUES (185, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 15:12:47', 1);
INSERT INTO `test_problem_record` VALUES (186, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 15:12:54', 1);
INSERT INTO `test_problem_record` VALUES (187, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 15:13:20', 1);
INSERT INTO `test_problem_record` VALUES (188, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 7, '', '2024/08/22 15:14:24', 0);
INSERT INTO `test_problem_record` VALUES (189, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 16, '', '2024/08/22 15:21:03', 1);
INSERT INTO `test_problem_record` VALUES (190, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 16, '', '2024/08/22 16:02:22', 1);
INSERT INTO `test_problem_record` VALUES (191, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 16, '', '2024/08/22 16:04:36', 1);
INSERT INTO `test_problem_record` VALUES (192, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 89, '', '2024/08/22 16:17:13', 2);
INSERT INTO `test_problem_record` VALUES (193, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 16:19:39', 1);
INSERT INTO `test_problem_record` VALUES (194, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 14, '', '2024/08/22 16:20:17', 1);
INSERT INTO `test_problem_record` VALUES (195, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 6, '', '2024/08/22 16:24:32', 0);
INSERT INTO `test_problem_record` VALUES (196, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 16, '', '2024/08/22 16:26:26', 1);
INSERT INTO `test_problem_record` VALUES (197, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 17, '', '2024/08/22 16:27:37', 1);
INSERT INTO `test_problem_record` VALUES (198, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 17, '', '2024/08/22 16:27:48', 1);
INSERT INTO `test_problem_record` VALUES (199, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 14, '', '2024/08/22 16:27:55', 1);
INSERT INTO `test_problem_record` VALUES (200, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 16:27:59', 1);
INSERT INTO `test_problem_record` VALUES (201, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 16:28:41', 1);
INSERT INTO `test_problem_record` VALUES (202, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 11, '', '2024/08/22 16:34:07', 1);
INSERT INTO `test_problem_record` VALUES (203, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 16:48:52', 1);
INSERT INTO `test_problem_record` VALUES (204, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 7, '', '2024/08/22 17:06:24', 0);
INSERT INTO `test_problem_record` VALUES (205, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 15, '', '2024/08/22 17:06:38', 1);
INSERT INTO `test_problem_record` VALUES (206, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 14, '', '2024/08/22 18:17:10', 1);
INSERT INTO `test_problem_record` VALUES (207, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 8, '', '2024/08/22 18:18:10', 0);
INSERT INTO `test_problem_record` VALUES (208, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 8, '', '2024/08/22 18:23:57', 0);
INSERT INTO `test_problem_record` VALUES (209, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 14, '', '2024/08/22 18:24:36', 1);
INSERT INTO `test_problem_record` VALUES (210, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 17, '', '2024/08/23 08:57:42', 1);
INSERT INTO `test_problem_record` VALUES (211, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 17, '', '2024/08/23 08:58:54', 1);
INSERT INTO `test_problem_record` VALUES (212, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 12, '', '2024/08/23 09:54:03', 1);
INSERT INTO `test_problem_record` VALUES (213, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 12, '', '2024/08/23 10:21:40', 1);
INSERT INTO `test_problem_record` VALUES (214, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 12, '', '2024/08/23 10:21:54', 1);
INSERT INTO `test_problem_record` VALUES (215, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/23 10:34:02', 2);
INSERT INTO `test_problem_record` VALUES (216, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/23 11:00:48', 2);
INSERT INTO `test_problem_record` VALUES (217, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/23 11:03:06', 2);
INSERT INTO `test_problem_record` VALUES (218, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/23 11:20:43', 2);
INSERT INTO `test_problem_record` VALUES (219, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 13, '', '2024/08/23 11:23:48', 2);
INSERT INTO `test_problem_record` VALUES (220, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 8, '', '2024/08/23 11:25:07', 1);
INSERT INTO `test_problem_record` VALUES (221, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 17, '', '2024/08/23 11:29:55', 2);
INSERT INTO `test_problem_record` VALUES (222, '1', 'admin', 'http://localhost:6008/routes/upload/A-defaultavatar.png', 109, '', '2024/08/23 11:30:43', 3);

-- ----------------------------
-- Table structure for test_result
-- ----------------------------
DROP TABLE IF EXISTS `test_result`;
CREATE TABLE `test_result`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL COMMENT '测试结果id',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试结果类型',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '测试结果描述',
  `suggestion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '建议',
  `user_type` int NOT NULL COMMENT '问题类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_result
-- ----------------------------
INSERT INTO `test_result` VALUES (1, 1, '极高智商', '恭喜你！你的智商如同璀璨的明星，高悬在智慧的顶峰。你拥有超凡的分析力和非凡的创造力，能够在复杂问题中游刃有余。你的思维如闪电般迅捷，灵感源源不断。你注定是改变世界的力量，无论是科学研究、创新发明，还是艺术创作，你都能在自己选择的领域中脱颖而出。未来在你面前无限宽广，等你用智慧去探索。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (2, 2, '卓越智者', '你的智力水平远超常人，思维敏捷，逻辑严密。你如同一位智者，在知识的海洋中遨游，能轻松理解复杂的概念，解决棘手的问题。你具备出色的学习能力和创新意识，能在学术或职业领域中取得非凡的成就。你是团队中的智力担当，也是朋友中的策略高手。无论面对什么挑战，你总能从容应对，找到最佳的解决方案。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (3, 3, '智慧之光', '你的智力如一束明亮的光，照亮了前行的路。你具备超越普通人的理解力和推理能力，能够迅速掌握新知识，并将其灵活应用。无论是学习新技能，还是应对生活中的难题，你总能表现得游刃有余。你在工作和学习中总能脱颖而出，是同伴们的榜样。你的潜力无限，只要你愿意，未来将为你敞开更多的机会之门。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (4, 4, '常规智力', '你的智力水平处于一个稳固的中间地带，表现出了坚实的学习和理解能力。你能够顺利应对生活和工作中的大多数挑战，适应力强，执行力佳。你有着健康的思维方式，能在必要时做出明智的决策。你在团队中是一位可靠的伙伴，既能独立完成任务，又能在需要时提供有力的支持。平衡和稳定是你最大的优势，让你在生活中始终立于不败之地。', '努力努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (5, 5, '潜力智者', '你可能需要比别人付出更多的努力来达到目标，但这并不意味着你无法成功。相反，你拥有潜力，只需要多一点耐心和坚持。你在面对新的知识和挑战时，可能需要多花一点时间去理解和消化，但一旦掌握，你的记忆和应用能力是非常可靠的。你是一个有韧性的人，能够在逆境中找到自己的路。相信自己，你的努力终将得到回报。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (6, 6, '智力探索者', '你的智力可能会在一些复杂的任务中面临挑战，但你并非孤立无援。你有自己的强项和天赋，尤其是在某些特定的领域，你可以表现得非常出色。你可能需要更多的支持和帮助来应对生活中的某些方面，但你坚韧不拔的性格将成为你最大的优势。通过与他人合作和持续学习，你可以不断进步，找到最适合自己的发展道路。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (7, 7, '智慧萌芽', '你的智力在某些方面可能会遇到较大的困难，但这也意味着你拥有不同的视角和独特的优势。你可能需要更多的指导和帮助来应对日常生活中的挑战，但你也因此拥有了更多的机会去学习如何在逆境中成长。你的坚持和努力将帮助你克服种种障碍，找到属于你的成功之路。记住，每个人的智慧都有其独特的闪光点，而你的智慧正在萌芽，只待时日便可茁壮成长。', '努力学习有助于提高智力哦~', 3);
INSERT INTO `test_result` VALUES (8, 1, '哈哈哈哈哈哈', '泥猴啊', '哈哈哈哈哈哈', 2);
INSERT INTO `test_result` VALUES (9, 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈', 2);
INSERT INTO `test_result` VALUES (10, 3, '的方法不当', '反对和山东河南', '哈哈哈哈哈', 2);
INSERT INTO `test_result` VALUES (11, 4, '是否会你哦怎么', '烦得很', 'hhhhh', 2);
INSERT INTO `test_result` VALUES (12, 1, '无抑郁倾向', '情绪状态正常，无抑郁迹象', '继续保持良好状态，关注身心健康', 1);
INSERT INTO `test_result` VALUES (13, 2, '轻度抑郁', '偶尔感到情绪低落，但能够自我调节', '尝试增加积极活动，寻求社会支持', 1);
INSERT INTO `test_result` VALUES (14, 3, '中度抑郁', '情绪持续低落，影响日常生活', '建议寻求专业心理咨询，加强自我关怀', 1);
INSERT INTO `test_result` VALUES (15, 4, '重度抑郁', '情绪严重低落，需紧急干预', '立即就医，接受专业治疗，避免自我伤害', 1);

-- ----------------------------
-- Table structure for test_result_record
-- ----------------------------
DROP TABLE IF EXISTS `test_result_record`;
CREATE TABLE `test_result_record`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `user_score` int NOT NULL COMMENT '答题分数',
  `update_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '答题时间',
  `test_type` int NOT NULL COMMENT '测试类型',
  `test_result_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试结果类型',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试结果描述',
  `suggestion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '测试结果建议',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_result_record
-- ----------------------------
INSERT INTO `test_result_record` VALUES (2, 1, 'admin', 13, '2024/8/23 11:23:45', 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈');
INSERT INTO `test_result_record` VALUES (3, 1, 'admin', 13, '2024/8/23 11:23:48', 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈');
INSERT INTO `test_result_record` VALUES (4, 1, 'admin', 8, '2024/8/23 11:25:7', 1, '中度抑郁', '情绪持续低落，影响日常生活', '建议寻求专业心理咨询，加强自我关怀');
INSERT INTO `test_result_record` VALUES (5, 1, 'admin', 17, '2024/8/23 11:29:55', 2, '是否会你哦怎么', '烦得很', 'hhhhh');
INSERT INTO `test_result_record` VALUES (6, 1, 'admin', 109, '2024/8/23 11:30:44', 3, '智慧之光', '你的智力如一束明亮的光，照亮了前行的路。你具备超越普通人的理解力和推理能力，能够迅速掌握新知识，并将其灵活应用。无论是学习新技能，还是应对生活中的难题，你总能表现得游刃有余。你在工作和学习中总能脱颖而出，是同伴们的榜样。你的潜力无限，只要你愿意，未来将为你敞开更多的机会之门。', '努力学习有助于提高智力哦~');
INSERT INTO `test_result_record` VALUES (7, 1, 'admin', 104, '2024/8/23 13:39:45', 3, '智慧之光', '你的智力如一束明亮的光，照亮了前行的路。你具备超越普通人的理解力和推理能力，能够迅速掌握新知识，并将其灵活应用。无论是学习新技能，还是应对生活中的难题，你总能表现得游刃有余。你在工作和学习中总能脱颖而出，是同伴们的榜样。你的潜力无限，只要你愿意，未来将为你敞开更多的机会之门。', '努力学习有助于提高智力哦~');
INSERT INTO `test_result_record` VALUES (8, 1, 'admin', 104, '2024/8/23 13:40:10', 3, '智慧之光', '你的智力如一束明亮的光，照亮了前行的路。你具备超越普通人的理解力和推理能力，能够迅速掌握新知识，并将其灵活应用。无论是学习新技能，还是应对生活中的难题，你总能表现得游刃有余。你在工作和学习中总能脱颖而出，是同伴们的榜样。你的潜力无限，只要你愿意，未来将为你敞开更多的机会之门。', '努力学习有助于提高智力哦~');
INSERT INTO `test_result_record` VALUES (9, 1, 'admin', 4, '2024/8/23 14:1:14', 1, '无抑郁倾向', '情绪状态正常，无抑郁迹象', '继续保持良好状态，关注身心健康');
INSERT INTO `test_result_record` VALUES (10, 1, 'admin', 13, '2024/8/23 15:23:26', 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈');
INSERT INTO `test_result_record` VALUES (11, 1, 'admin', 12, '2024/8/23 17:1:40', 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈');
INSERT INTO `test_result_record` VALUES (12, 1, 'admin', 14, '2024/8/26 9:8:48', 2, '的方法不当', '反对和山东河南', '哈哈哈哈哈');
INSERT INTO `test_result_record` VALUES (13, 1, 'admin', 12, '2024/8/26 9:14:9', 2, '黑恶黑', '打死了华盛顿', '哈哈哈哈哈哈哈哈哈');

-- ----------------------------
-- Table structure for timu
-- ----------------------------
DROP TABLE IF EXISTS `timu`;
CREATE TABLE `timu`  (
  `id` int NOT NULL COMMENT '题目id',
  `curcontent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '题目内容',
  `zhengquejieguo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '正确选项',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of timu
-- ----------------------------
INSERT INTO `timu` VALUES (1, '今天过得好吗？', 'A');
INSERT INTO `timu` VALUES (2, '吃饭了没有？', 'A');
INSERT INTO `timu` VALUES (3, '水果呢，有吃吗？', 'A');
INSERT INTO `timu` VALUES (4, '最近怎么样？', 'A');
INSERT INTO `timu` VALUES (5, '其实我想说，有人很爱你！', 'A');

-- ----------------------------
-- Table structure for useractivitylist
-- ----------------------------
DROP TABLE IF EXISTS `useractivitylist`;
CREATE TABLE `useractivitylist`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '预约id, 自增id',
  `activity_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动标题',
  `activity_con` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动内容',
  `activity_time` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动时间',
  `activity_address` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动地址',
  `activity_tips` varchar(5000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '活动注意事项',
  `user_id` int NULL DEFAULT NULL COMMENT '用户id',
  `activity_id` int NULL DEFAULT NULL COMMENT '活动id',
  `appointment_status` int NULL DEFAULT NULL COMMENT '预约状态 0未预约 1预约中 2已预约',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of useractivitylist
-- ----------------------------
INSERT INTO `useractivitylist` VALUES (6, '心理讲座', '为丰富校园化生活,进一步推动我校心理素质教育工作,提升大学生心理健康水平,引导广大学生认识自我、发展自我、欣赏自我、关爱自我,学会自我调适、自我规划', '2023/7/26', '武汉市体育中心', '记得携带水杯', 1, 1, 1);

-- ----------------------------
-- Table structure for userevaluate
-- ----------------------------
DROP TABLE IF EXISTS `userevaluate`;
CREATE TABLE `userevaluate`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,也是评价id',
  `user_id` int NULL DEFAULT NULL COMMENT '用户id,也是users表中的id',
  `user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `shop_id` int NULL DEFAULT NULL COMMENT '商品id',
  `evaluate_start` int NULL DEFAULT NULL COMMENT '评价星级',
  `evaluate_content` varchar(10000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '评价内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userevaluate
-- ----------------------------
INSERT INTO `userevaluate` VALUES (18, 1, 'royal', 39, 5, '用实际行动温暖');
INSERT INTO `userevaluate` VALUES (19, 1, 'royal', 38, 5, '文章写的很nice');
INSERT INTO `userevaluate` VALUES (28, 1, 'admin', 39, 5, '12');
INSERT INTO `userevaluate` VALUES (29, 1, 'admin', 24, 5, '文章写的很棒');

-- ----------------------------
-- Table structure for userfavorite
-- ----------------------------
DROP TABLE IF EXISTS `userfavorite`;
CREATE TABLE `userfavorite`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,同时用作用户收藏id',
  `user_id` int NULL DEFAULT NULL COMMENT '用户id',
  `shop_id` int NULL DEFAULT NULL COMMENT '商品id',
  `class_id` int NULL DEFAULT NULL COMMENT '分类id,与classify表的id是对应的',
  `item_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `item_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `item_price` int NULL DEFAULT NULL COMMENT '商品价格',
  `item_desc` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userfavorite
-- ----------------------------
INSERT INTO `userfavorite` VALUES (6, 1, 39, 1, '那些缺乏安全感的孩子，到底需要怎样的爱？', 'http://localhost:6008/routes/upload/20230714164300-a2a2cb26726f5de1e547b8100.png', NULL, NULL);
INSERT INTO `userfavorite` VALUES (7, 1, 37, 1, '垃圾婚姻的6大定律，你中招了吗？', 'http://localhost:6008/routes/upload/20230715170952-9444150755b4448276a749e00.png', NULL, NULL);
INSERT INTO `userfavorite` VALUES (8, 1, 24, 13, '原来这就叫“空船理论”！ 帮你解决90%的问题', 'http://localhost:6008/routes/upload/20230715172416-9444150755b4448276a749e0d.png', NULL, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增id,同时用作用户id',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `userphone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `head_portrait` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '123789', '123', 'http://localhost:6008/routes/upload/A-defaultavatar.png');
INSERT INTO `users` VALUES (2, '13188889520', '123789', '123', 'http://localhost:6008/routes/upload/A-defaultavatar.png');
INSERT INTO `users` VALUES (3, '12345678912', '123789', '123', 'http://localhost:6008/routes/upload/A-defaultavatar.png');
INSERT INTO `users` VALUES (4, '13199998520', '123789', '123', 'http://localhost:6008/routes/upload/A-defaultavatar.png');

SET FOREIGN_KEY_CHECKS = 1;
