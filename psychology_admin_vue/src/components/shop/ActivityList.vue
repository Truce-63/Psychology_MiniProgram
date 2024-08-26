<template>
<div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动推送管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <el-button type="primary" @click="openModal(true)">新增活动推送</el-button>
        <!-- 活动推送列表区域 -->
        <el-table :data="tableList" border stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="活动标题" prop="activity_name"></el-table-column>
            <el-table-column label="活动内容" prop="activity_con"></el-table-column>
            <el-table-column label="活动时间" prop="activity_time"></el-table-column>
            <el-table-column label="活动地址" prop="activity_address"></el-table-column>
            <el-table-column label="活动注意事项" prop="activity_tips"></el-table-column>
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

    <!-- 新增 & 修改活动推送内容区域 -->
    <el-dialog :title="isAdd ? '新增活动推送' : '修改活动推送'" :visible.sync="isModal" width="66%" @close="closeModal">
        <el-form :model="formSource" ref="formSourceRef" label-width="auto" :rules="rules">
            <el- -item label="活动标题" label-width="160px" prop="activity_name" required>
                <el-input v-model="formSource.activity_name"></el-input>
            </el->
            <el-form-item label="活动内容" prop="activity_con" label-width="160px" required>
                <el-input type="textarea" v-model="formSource.activity_con"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="activity_time" label-width="160px" required>
                <el-date-picker v-model="formSource.activity_time" type="date">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动地址" prop="activity_address" label-width="160px" required>
                <el-input v-model="formSource.activity_address"></el-input>
            </el-form-item>

            <el-form-item label="活动注意事项" prop="activity_tips" label-width="160px" required>
                <el-input type="textarea" v-model="formSource.activity_tips"></el-input>
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
            isAdd: true, // 是否为新增活动推送 默认是
            isModal: false, // 控制对话框的显示与隐藏
            formSource: {
                id: null, // 活动id
                activity_name: '', // 活动名称
                activity_con: '', // 活动内容
                activity_time: '', // 活动时间
                activity_address: '', // 活动地址
                activity_tips: '', // 活动注意事项
            }, // 表单数据
            rules: {
                activity_name: [{
                    required: true,
                    message: '活动标题不能为空!',
                    trigger: 'blur'
                }],
                activity_con: [{
                    required: true,
                    message: '活动内容不能为空',
                    trigger: 'blur'
                }],
                activity_time: [{
                    required: true,
                    message: '活动时间不能为空',
                    trigger: 'change'
                }],
                activity_address: [{
                    required: true,
                    message: '活动地址不能为空',
                    trigger: 'blur'
                }],
                activity_tips: [{
                    required: true,
                    message: '活动注意事项不能为空',
                    trigger: 'blur'
                }]
            }
        };
    },
    created() {
        this.getClassList() // 获取活动推送
    },
    methods: {
        // 获取活动推送
        async getClassList() {
            const {
                data: res
            } = await this.$http.post('getActivity', {})
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
        // 修改活动推送
        async setClass() {

            if (this.isAdd) {
                // 新增活动推送
                const {
                    data: res
                } = await this.$http.post('addActivity', {
                    ...this.formSource,
                    activity_time: this.$moment(this.formSource.activity_time).format('YYYY/MM/DD')
                })
                if (res.status === 200) {
                    this.isModal = false
                    this.getClassList()
                } else {
                    this.$message.error(res.msg)
                }
            } else {
                // 修改活动推送
                const {
                    data: res
                } = await this.$http.post('updateActivity', {
                    ...this.formSource,
                    activity_time: this.$moment(this.formSource.activity_time).format('YYYY/MM/DD')
                })
                if (res.status === 200) {
                    this.isModal = false
                    this.getClassList()
                } else {
                    this.$message.error(res.msg)
                }
            }
        },
        // 删除活动推送
        removeClass(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(async () => {
                    const {
                        data: res
                    } = await this.$http.post('delActivity', {
                        id: data.id
                    })
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
                id: null, // 活动id
                activity_name: '', // 活动名称
                activity_con: '', // 活动内容
                activity_time: '', // 活动时间
                activity_address: '', // 活动地址
                activity_tips: '', // 活动注意事项
            }
            this.$refs.formSourceRef.resetFields()
        },
    },
}
</script>

<style lang="less" scoped>
</style>
