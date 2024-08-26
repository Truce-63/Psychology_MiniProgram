<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名(如：admin)" v-model="searchQuery" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserSearch"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="用户手机号" prop="userphone"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="70px" :rules="rules">
                <el-form-item label="用户名" prop="username" label-width="80px" required>
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="80px" required>
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号" prop="userphone" label-width="80px" required>
                    <el-input maxlength="11" v-model="addForm.userphone"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserModal('add')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" ref="editFormRef" label-width="70px" :rules="rules">
                <el-form-item label="用户名" prop="username" label-width="80px" required>
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="80px" required>
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号" prop="userphone" label-width="80px" required>
                    <el-input maxlength="11" v-model="editForm.userphone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserModal('edit')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '', // 搜索
            userlist: [],
            // 控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            // 添加用户的表单数据
            addForm: {
                // 此图为系统分配商户默认头像 如需更改 请到小程序端进行头像修改
                head_portrait: 'http://localhost:6008/routes/upload/A-defaultavatar.png',
                username: '',
                password: '',
                userphone: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                userphone: [
                    { required: true, message: '请输入用户手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' },
                ],
            },
            // 控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            // // 查询到的用户信息对象
            editForm: {},
            // 控制分配角色对话框的显示与隐藏
            setRoleDialogVisible: false,
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.post('getUser', {})
            if (res.status === 200) {
                this.userlist = res.data
            } else {
                this.$message.error(res.msg)
            }

            console.log(res.list)
        },

        // 监听添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        addUserModal(type) {
            if (type === 'add') {
                this.addUser()
            } else {
                this.editUserInfo()
            }
        },
        // 点击按钮，添加新用户
        async addUser() {
            // 未通过检测 则不在继续执行
            if (!this.checkForm(this.addForm)) {
                return false
            }
            // 已通过检测 则可以发起添加用户的网络请求
            const { data: res } = await this.$http.post('register', this.addForm)
            console.log(res)
            if (res.status === 200) {
                this.$message.success(res.msg)
            } else {
                this.$message.error(res.msg)
            }

            // 隐藏添加用户的对话框
            this.addDialogVisible = false
            // 重新获取用户列表数据
            this.getUserList()
        },
        // 展示编辑用户的对话框
        async showEditDialog(obj) {
            console.log(obj)
            this.editForm = JSON.parse(JSON.stringify(obj))
            this.fileList = [{ url: obj.head_portrait }]
            this.editDialogVisible = true
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        // 修改用户信息并提交
        async editUserInfo() {
            // 未通过检测 则不在继续执行
            if (!this.checkForm(this.editForm)) {
                return false
            }
            // 未通过检测 则发起修改用户信息的数据请求
            const { data: res } = await this.$http.post('updateUser', this.editForm)

            if (res.status === 200) {
                this.$message.success(res.msg)
            } else {
                return this.$message.error(res.msg)
            }

            // 关闭对话框
            this.editDialogVisible = false
            // 刷新数据列表
            this.getUserList()
        },
        // 根据Id删除对应的用户信息
        async removeUserById(id) {
            // 弹框询问用户是否删除数据
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).catch((err) => err)

            // 如果用户确认删除，则返回值为字符串 confirm
            // 如果用户取消了删除，则返回值为字符串 cancel
            // console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const { data: res } = await this.$http.post('deleteUser', { id: id })
            console.log(res.data)
            if (res.status !== 200) {
                return this.$message.error('删除用户失败！')
            }

            this.$message.success('删除用户成功！')
            this.getUserList()
        },

        // 搜索
        async getUserSearch() {
            const { data: res } = await this.$http.post('getUser', { username: this.searchQuery })
            console.log(res.data)
            this.userlist = res.data
        },

        // 检查form表单是否全部填写了
        checkForm(data) {
            let isPhone = /^1[0-9]{10}$/.test(data.userphone)
            if (!data.head_portrait) {
                this.$message.error('请上传用户头像')
                return false
            }
            if (!data.username) {
                this.$message.error('请输入用户名')
                return false
            }
            if (!data.password) {
                this.$message.error('请输入密码')
                return false
            }
            if (!data.userphone || !isPhone) {
                this.$message.error('请检查手机号')
                return false
            }

            return true
        },
    },
}
</script>

<style lang="less" scoped>
</style>
