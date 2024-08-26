<template>
    <div>
        <!-- 搜索区域 -->
        <el-card>
            <el-select filterable v-model="user_id" placeholder="请选择需要查看的商户" @change="search">
                <el-option v-for="item in shopList" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
            </el-select>
        </el-card>

        <!-- 表格区域 -->
        <el-table :data="tableData" border stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="所属文章" prop="user_name"></el-table-column>
            <el-table-column label="文章信息">
                <template slot-scope="scope">
                    <!-- 数据库查询不到此文章的情况 -->
                    <el-tag type="danger" size="mini" v-if="JSON.stringify(scope.row.itemShopData) === '{}'">文章已下架</el-tag>
                    <div class="tabinfo">
                        <div class="imgbox">
                            <img class="commodity-img" :src="scope.row.itemShopData.item_image">
                        </div>
                        <div class="textbox">
                            <div>文章id：{{scope.row.shop_id}}</div>
                            <div>文章标题：{{scope.row.itemShopData.item_name}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评价星级">
                <template slot-scope="scope">
                    <el-rate disabled v-model="scope.row.evaluate_start"></el-rate>
                </template>
            </el-table-column>
            <el-table-column label="评价内容" prop="evaluate_content"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <!-- 编辑按钮 -->
                    <el-button v-if="JSON.stringify(scope.row.itemShopData) !== '{}'" type="primary" icon="el-icon-edit" size="mini" @click="setModal(scope.row)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEvaluate(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑 评价内容 弹框 -->
        <el-dialog title="编辑评价" :visible.sync="dialogVisible">
            <div class="tabinfo" style="background-color: #efefef;" v-if="shopData && shopData['itemShopData']">
                <div class="imgbox">
                    <img class="commodity-img" :src="shopData['itemShopData']['item_image']">
                </div>
                <div class="textbox">
                    <div>文章标题：{{shopData['itemShopData']['item_name']}}</div>
                </div>
            </div>

            <div class="layout-flex">
                <div class="left"><span class="red-text">*</span>评价星级</div>
                <div class="right">
                    <el-rate v-model="shopData['evaluate_start']"></el-rate>
                </div>
            </div>

            <div class="layout-flex">
                <div class="left"><span class="red-text">*</span>评价内容</div>
                <div class="right">
                    <el-input type="textarea" :rows="2" v-model="shopData['evaluate_content']"></el-input>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveData">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false, // 是否弹出弹框
            user_id: '', // 当前选中的商户
            tableData: [], // 收藏 源数据
            classList: [], // 分类数据源
            shopList: [], // 商户数据源
            allShopList: [], // 该商户下所有文章
            shopData: {}, // 需要操作的内容
        }
    },

    created() {
        this.getShopList() // 获取系统内所有文章
        this.getClassList() // 获取分类
        this.getUserList()
    },

    methods: {
        // 提交修改的评价
        async saveData() {
            if (!this.shopData.evaluate_content) {
                this.$message.error('请输入评价内容!')
                return false
            }

            const { data: res } = await this.$http.post('editShopEvaluate', {
                id: this.shopData.id,
                evaluate_start: this.shopData.evaluate_start,
                evaluate_content: this.shopData.evaluate_content,
            })
            if (res.status === 200) {
                this.dialogVisible = false;
                this.search()
            } else {
                this.$message.error(res.msg)
            }
        },
        // 更改评价内容 星级
        setModal(data) {
            this.dialogVisible = true
            this.shopData = JSON.parse(JSON.stringify(data))
            console.log(this.shopData, '=================shopData')
        },
        // 删除评价
        async delEvaluate(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delShopEvaluate', {
                        id: data.id,
                    })
                    if (res.status === 200) {
                        this.search()
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },
        // 查询评价
        async search() {
            // this.getShopList();
            const { data: res } = await this.$http.post('getShopEvaluate', {
                user_id: this.user_id,
            })
            if (res.status === 200) {
                // this.tableData = res['data']
                this.tableData = (res['data'] || []).map((item) => {
                    let newarr = (this.allShopList || []).filter((fit) => item.shop_id === fit.id)
                    return {
                        ...item,
                        itemShopData: JSON.stringify(newarr) === '[]' ? {} : newarr[0],
                    }
                })
                console.log(this.tableData, '==================================tableData')
            } else {
                this.$message.error(res.msg)
            }
        },
        // 查询系统内所有文章
        async getShopList() {
            const { data: res } = await this.$http.post('getAllClassContent', {})
            if (res.status === 200) {
                this.allShopList = res['data']
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
        // 获取分类
        async getClassList() {
            const { data: res } = await this.$http.post('getClassTabs', {})
            if (res.status === 200) {
                this.classList = res.data
            } else {
                this.$message.error(res.msg)
            }
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

.layout-flex {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .red-text {
        color: red;
    }
    .left {
        margin-right: 8px;
        text-align: right;
        font-weight: 600;
    }
}
</style>