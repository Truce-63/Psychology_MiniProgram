<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/logoimg.png" alt="" />
                <span>心理健康资讯后台管理系统</span>
            </div>
            <div class="btn">
                <el-button style="margin-right:12px;" type="info" @click="logout">退出</el-button>
            </div>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单 -->

                    <el-submenu index="1">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-user"></i>
                            <!-- 文本 -->
                            <span>基础设置</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/users" @click="saveNavState('/users')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>用户管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="/myFavorite" @click="saveNavState('/myFavorite')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-s-management"></i>
                                <!-- 文本 -->
                                <span>收藏管理</span>
                            </template>
                        </el-menu-item>

                       <!--
                        <el-menu-item index="/myOrder" @click="saveNavState('/myOrder')">
                            <template slot="title">
                                 图标 
                                <i class="el-icon-s-order"></i>-->
                                <!-- 文本 
                                <span>订单管理</span>
                            </template>
                        </el-menu-item>-->

                        <el-menu-item index="/myActivityList" @click="saveNavState('/myActivityList')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-s-order"></i>
                                <!-- 文本 -->
                                <span>预约管理</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                    <el-submenu index="2">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="iconfont icon-danju"></i>
                            <!-- 文本 -->
                            <span>服务管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/articleList" @click="saveNavState('/articleList')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>文章管理</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/classList" @click="saveNavState('/classList')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>分类管理</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/comments" @click="saveNavState('/comments')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>评价管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/problem" @click="saveNavState('/problem')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>题目管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/scoreRecord" @click="saveNavState('/scoreRecord')">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>测试记录管理</span>
                            </template>
                        </el-menu-item>
                    

                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            // 左侧菜单数据
            menulist: [],
            // 是否折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: '',
        }
    },
    created() {
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        // 退出登录
        logout() {
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!',
                    })
                    sessionStorage.clear() // 退出登录后 清除本地sessionStorage里面所有存储的数据
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出',
                    })
                })
        },
        // 切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        // 保存链接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
    },
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    // padding: 15px 0;
    height: 80px !important;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
    img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin: 15px 0px 15px 15px;
    }
}

.el-aside {
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
