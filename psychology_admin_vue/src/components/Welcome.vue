<template>
    <div>
        <h3>欢迎来到心理健康资讯后台管理系统！</h3>

        <!-- <el-card>
            <el-select filterable v-model="user_id" placeholder="请选择需要查看的商户" @change="search">
                <el-option v-for="item in shopList" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
            </el-select>
        </el-card>

        <el-table :data="tableData" border stripe>
            <el-table-column label="商户id" prop="user_id"></el-table-column>
            <el-table-column label="商户名称" prop="username"></el-table-column>
            <el-table-column label="订单总金额" prop="sumprice"></el-table-column>
            <el-table-column label="订单总数" prop="sumnum"></el-table-column>
        </el-table> -->


    </div>
</template>

<script>
export default {
    data() {
        return {
          user_id: '', // 商户id
          shopList: [], // 商户数据源
          tableData: []
        }
    },
    created() {
      this.getUserList()

      this.search()
    },
    methods: {
      // 查询统计数据
        async search() {
            console.log(this.user_id)
            const { data: res } = await this.$http.post('totalOrder', {
                user_id: this.user_id,
            })
            if (res.status === 200) {
                this.tableData = res['data'];
                console.log(this.tableData,'===============this.tableData');
            } else {
                this.$message.error(res.msg)
            }
        },
        // 获取商户
        async getUserList() {
            const { data: res } = await this.$http.post('getUser', {})
            if (res.status === 200) {
                this.shopList = res.data
            } else {
                this.$message.error(res.msg)
            }
        },
    },
}
</script>