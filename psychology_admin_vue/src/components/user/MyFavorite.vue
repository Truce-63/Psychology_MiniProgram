<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>关注管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-select filterable v-model="user_id" placeholder="请选择需要查看的用户" @change="search">
                <el-option v-for="item in shopList" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
            </el-select>
        </el-card>

        <el-table :data="tableData" border stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="文章分类">
                <template slot-scope="scope">
                    <el-select style="width:60%;" v-model="scope.row.class_id" disabled>
                        <el-option v-for="(item, index) in classList" :key="index" :label="item.class_name" :value="item.id"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="文章信息">
                <template slot-scope="scope">
                    <div class="tabinfo">
                        <div class="imgbox">
                            <img class="commodity-img" :src="scope.row.item_image">
                        </div>
                        <div class="textbox">
                            <div>文章标题：{{scope.row.item_name}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" size="mini" @click="editFavorite(scope.row)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user_id: '', // 当前选中的用户
            tableData: [], // 关注 源数据
            classList: [], // 分类数据源
            shopList: [], // 用户数据源
        }
    },

    created() {
        this.getClassList() // 获取分类
        this.getUserList()
    },

    methods: {
        async search() {
            console.log(this.user_id)
            const { data: res } = await this.$http.post('getUserfavorite', {
                user_id: this.user_id,
            })
            if (res.status === 200) {
                this.tableData = res['data']
            } else {
                this.$message.error(res.msg)
            }
        },
        // 获取用户
        async getUserList() {
            const { data: res } = await this.$http.post('getUser', {})
            if (res.status === 200) {
                this.shopList = res.data
            } else {
                this.$message.error(res.msg)
            }
        },
        // 获取分类
        async getClassList() {
            const { data: res } = await this.$http.post('getClassTabs', {})
            if (res.status === 200) {
                this.classList = res.data
            } else {
                this.$message.error(res.msg)
            }
        },
        // 更新此文章为取消关注
        async editFavorite(data) {
            this.$confirm('此取消关注操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delUserfavorite', {id: data.id})
                    if (res.status === 200) {
                        this.search()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },
    },
}
</script>

<style lang="less" scoped>
.tabinfo {
    display: flex;

    .imgbox {
        width: 60px;
        padding: 10px;
        padding-left: 0;
        position: relative;

        .status_ts {
            position: absolute;
            width: 60px;
            height: 60px;
            padding-top: 18px;
            top: 10px;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            text-align: center;
            color: #fff;
            display: inline-block;
            z-index: 1000;
            border-radius: 4px;
        }

        .commodity-img,
        .defaultimg {
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
            border: 1px solid #f1f1f1;
            width: 60px;
            height: 60px;
        }

        .defaultimg {
            background: #e9e9e9;
            display: inline-block;
            text-align: center;
            padding-top: 15px;
        }

        // .commodity-img:hover {
        //     z-index: 1000;
        //     margin-left: 142px;
        //     transform: scale(6);
        //     position: relative;
        //     z-index: 1001;
        // }
    }

    .textbox {
        margin: 10px 0 0 10px;
    }
}
</style>