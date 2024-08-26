<template>
    <div class="list">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-button type="primary" @click="openModal(true)">新增分类</el-button>
            <!-- 分类列表区域 -->
            <el-table :data="tableList" border stripe>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="分类名称" prop="class_name"></el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="openModal(false,scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeClass(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增 & 修改分类内容区域 -->
        <el-dialog :title="isAdd ? '新增分类' : '修改分类'" :visible.sync="isModal" width="66%" @close="closeModal">
            <el-form :model="formSource" ref="formSourceRef" label-width="90px" :rules="rules">
                <el-form-item label="商品标题" prop="class_name" label-width="160px" required>
                    <el-input maxlength="6" v-model="formSource.class_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isAdd: true, // 是否为新增分类 默认是
            tableList: [], // 表格数据源
            isModal: false, // 控制对话框的显示与隐藏
            formSource: {
                id: null, // 分类id
                class_name: '', // 分类名称
            }, // 表单数据
            rules: {
                class_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        this.getClassList() // 获取分类
    },
    methods: {
        // 获取分类
        async getClassList() {
            const { data: res } = await this.$http.post('getClassTabs', {})
            if (res.status === 200) {
                this.tableList = res.data
            } else {
                this.$message.error(res.msg)
            }

        },
        // 打开弹框
        openModal(type, data) {
            this.isAdd = type
            this.isModal = true
            if (!type) {
                // 如果是编辑 那么拿一下编辑的内容
                this.formSource = JSON.parse(JSON.stringify(data))
            }
        },
        // 提交表单
        async submitForm() {
            this.$refs.formSourceRef.validate(async (valid) => {
                if (valid) {
                    await this.setClass();
                } else {
                    this.$message.error('请检查表单内容');
                }
            });
        },
        // 修改分类
        async setClass() {
            if (this.isAdd) {
                // 新增分类
                const { data: res } = await this.$http.post('addClassTabs', { class_name: this.formSource.class_name })
                if (res.status === 200) {
                    this.isModal = false
                    this.getClassList()
                } else {
                    this.$message.error(res.msg)
                }
            } else {
                // 修改分类
                const { data: res } = await this.$http.post('updateClassTabs', this.formSource)
                if (res.status === 200) {
                    this.isModal = false
                    this.getClassList()
                } else {
                    this.$message.error(res.msg)
                }
            }
        },
        // 删除分类
        removeClass(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delClassTabs', { id: data.id })
                    if (res.status === 200) {
                        this.getClassList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },

        // 关闭修改对话框
        closeModal() {
            this.formSource = {
                id: null, // 分类id
                class_name: '', // 分类名称
            }
            this.$refs.formSourceRef.resetFields()
        },
    },
}
</script>
<style lang="less" scoped>
</style>