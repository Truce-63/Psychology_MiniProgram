<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-select filterable v-model="user_id" placeholder="请选择需要查看的用户" @change="search">
                <el-option v-for="item in shopList" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
            </el-select>
        </el-card>

        <el-table :data="tableData" border stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <div class="tabinfo">
                        <div class="imgbox">
                            <img class="commodity-img" :src="scope.row.url">
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="购买数量" prop="num"></el-table-column>
            <el-table-column label="是否评价">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isevaluate === '1' ? 'success' : 'danger'">{{scope.row.isevaluate === '1' ? '已评价':'未评价' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="订单状态">
                <template slot-scope="scope">
                    <el-tag type="success">{{orderStatusList.find((item)=> item.value === scope.row.orderStatus).label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" size="mini" v-if="scope.row.orderStatus === 1" @click="update(scope.row)">出餐</el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="delOrderById(scope.row)"></el-button>
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
            tableData: [], // 订单 源数据
            shopList: [], // 用户数据源
            orderStatusList: [
                { label: '待出餐', value: 1 },
                { label: '待取餐', value: 2 },
                { label: '已取餐', value: 3},
            ],
        }
    },

    created() {
        this.getUserList()
    },

    methods: {
        // 查询选中的用户下的订单
        async search() {
            console.log(this.user_id)
            const { data: res } = await this.$http.post('getOrderList', {
                user_id: this.user_id,
                isAdmin: true,
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
        // 根据id删除订单
        async delOrderById(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delOrderList', { order_id: data.id })
                    if (res.status === 200) {
                        this.search()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },
        // 发货按钮
        async update(data) {
            if(data.stock <= 0) {
                this.$message.error('无库存啦，请先补货再发货!')
                return false;
            }
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('updateOrderList', { id: data.id, orderStatus: 2, shop_id: data.shop_id })
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