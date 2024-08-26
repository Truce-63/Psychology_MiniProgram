<template>
    <div class="list">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>答题记录管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-select filterable v-model="user_id" placeholder="请选择需要查看的用户" @change="search">
                        <el-option v-for="item in shopList" :key="item.id" :label="item.username" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <!-- 答题记录列表区域 -->
            <el-table :data="tableList" border stripe>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="用户id" prop="user_id"></el-table-column>
                <el-table-column label="用户名" prop="user_name"></el-table-column>
                <el-table-column label="分数" prop="user_score"></el-table-column>
                <el-table-column label="报告">
                    <template slot-scope="scope">
                        <div class="tabinfo">
                            <div class="textbox">
                                <div>体质类型：{{ scope.row.test_type }}</div>
                                <div>特征：{{ scope.row.description }}</div>
                                <div>建议：{{ scope.row.suggestion }}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="测试时间" prop="update_time"></el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeScoreRecord(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            shopList: [], // 用户数据源
            tableList: [], // 表格数据源
            user_id: '',
        }
    },
    created() {
        this.getUserList();
        this.getTestResultList() // 获取答题记录
    },
    methods: {
        // // 获取答题记录
        // async search() {
        //     const { data: res } = await this.$http.post('getTestResultList', {user_id: this.user_id})
        //     if (res.status === 200) {
        //         this.tableList = res.data
        //     } else {
        //         this.$message.error(res.msg)
        //     }

        // },
        // 获取答题记录
        async getTestResultList() {
            const { data: res } = await this.$http.post('getTestResultList', {})
            if (res.status === 200) {
                this.tableList = res.data
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
        // 删除答题记录
        removeScoreRecord(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delScoreRecordList', { id: data.id })
                    if (res.status === 200) {
                        this.getTestResultList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => { })
        },
    },
}
</script>
<style lang="less" scoped></style>