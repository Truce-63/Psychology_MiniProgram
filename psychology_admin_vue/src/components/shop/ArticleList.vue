<template>
    <div class="list">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入文章标题" v-model="searchQuery" clearable @clear="getTableList()">
                        <el-button slot="append" icon="el-icon-search" @click="getShopnameList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="setShopModal(true,null)">新增文章</el-button>
                </el-col>
            </el-row>

            <!-- 文章列表区域 -->
            <el-table :data="tableList" border stripe>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="创建用户">
                    <template slot-scope="scope">
                        <el-select style="width:60%;" v-model="scope.row.usershop_id" disabled>
                            <el-option v-for="(item, index) in shopList" :key="index" :label="item.username" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
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
                <el-table-column label="是否推荐">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.is_recommend ? 'success' : 'info'">
                            {{scope.row.is_recommend ? '是' : '否'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="内容">
                    <template slot-scope="scope">
                        <div v-html="scope.row.item_practice"></div>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="setShopModal(false,scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeShopById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增 & 修改文章内容区域 -->
        <el-dialog title="新增文章" :visible.sync="isModal" width="66%" @close="editDialogClosed">
            <el-form :model="formSource" ref="formSourceRef" label-width="90px">
                <el-form-item label="创建用户" label-width="160px" required>
                    <el-select style="width:100%;" v-model="formSource.usershop_id" placeholder="请选择创建用户">
                        <el-option v-for="(item, index) in shopList" :key="index" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章分类" label-width="160px" required>
                    <el-select style="width:100%;" v-model="formSource.class_id" placeholder="请选择文章分类">
                        <el-option v-for="(item, index) in classList" :key="index" :label="item.class_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标题" label-width="160px" required>
                    <el-input maxlength="36" v-model="formSource.item_name"></el-input>
                </el-form-item>
                <el-form-item label="文章图片" label-width="160px" required>
                    <!-- <el-upload action="http://localhost:6008/uploadImg" :http-request="upload" list-type="picture-card" :auto-upload="false" :file-list="fileList" :limit="3" :on-change="imageChange" :on-exceed="exceedChange"> -->
                    <el-upload action="http://localhost:6008/uploadImg" :http-request="upload" list-type="picture-card" :file-list="fileList" :limit="1" :on-change="imageChange" :on-exceed="exceedChange">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="fileList && fileList.length !== 0" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否推荐" label-width="160px" required>
                    <el-select style="width:100%;" v-model="formSource.is_recommend" placeholder="请选择是否是付费推荐">
                        <el-option label="不推荐" :value="0"></el-option>
                        <el-option label="推荐" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" label-width="160px" required>
                    <!-- <el-input v-model="formSource.item_practice"></el-input> -->
                    <vueQuillEditor @child-by-value="childByValue" :msg-object="formSource.item_practice"></vueQuillEditor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 放大图片 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="viewImage" alt="">
        </el-dialog>
    </div>
</template>
<script>
import vueQuillEditor from '../shareModule/vueQuillEditor.vue'
export default {
    components: {
        vueQuillEditor: vueQuillEditor,
    },
    data() {
        return {
            isAdd: false, // 弹框是否新增 默认否
            tableList: [], // 表格数据源
            shopList: [], // 商户数据源
            classList: [], // 分类数据源
            searchQuery: '', // 搜索
            isModal: false, // 控制对话框的显示与隐藏
            formSource: {
                usershop_id: '', // 创建用户
                class_id: '', // 文章分类
                item_name: '', // 文章标题
                item_image: '', // 文章图片
                item_practice: '', // 内容
                is_recommend: 0, // 当前文章是否被当前用户推荐 1推荐 0未推荐
                update_time: this.$moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
            }, // 表单数据

            dialogVisible: false,
            fileList: [], // 上传的图片数组
            viewImage: '', // 用于放大查看图片
        }
    },
    created() {
        this.getTableList() // 获取文章
        this.getUserList() // 获取商户
        this.getClassList() // 获取分类
    },
    methods: {
        // 上传图片
        async upload(f) {
            var formData = new FormData()
            formData.append('tweetPic', f.file, f.file.name)
            const { data: res } = await this.$http.post('uploadImg', formData)
            console.log(res, '======图片')
            if (res.status === 200) {
                this.formSource.item_image = res.data.localIamgeAddress
            } else {
                this.$message.error(res.msg)
            }
        },
        // 根据文章名称查询文章
        async getShopnameList() {
            const { data: res } = await this.$http.post('getAllClassContent', { title: this.searchQuery })
            if (res.status === 200) {
                this.tableList = res.data
            } else {
                this.$message.error(res.msg)
            }
        },
        // 获取所有分类下的文章
        async getTableList() {
            const { data: res } = await this.$http.post('getAllClassContent', {})
            if (res.status === 200) {
                this.tableList = res.data
            } else {
                this.$message.error(res.msg)
            }
        },
        // 打开文章信息的弹框
        setShopModal(isAdd, data) {
            this.isModal = true
            this.isAdd = isAdd
            if (!isAdd && data) {
                this.formSource = JSON.parse(JSON.stringify(data));
                this.fileList = [{ url: data.item_image }]
            }
        },
        // 新增 & 修改文章
        async saveData() {
            // 未通过检测 则不在继续执行
            if (!this.checkForm(this.formSource)) {
                return false
            }
            // 已通过检测 则可以发起网络请求
            if (this.isAdd) {
                // 新增
                const { data: res } = await this.$http.post('addAllClassContent', this.formSource)
                if (res.status === 200) {
                    this.isModal = false
                    this.getTableList()
                } else {
                    this.$message.error(res.msg)
                }
            } else {
                // 修改
                // let
                const { data: res } = await this.$http.post('editAllClassContent', this.formSource)
                if (res.status === 200) {
                    this.isModal = false
                    this.getTableList()
                } else {
                    this.$message.error(res.msg)
                }
            }
        },
        // 检查form表单是否全部填写了
        checkForm(data) {
            if (!data.usershop_id) {
                this.$message.error('请选择创建用户')
                return false
            }
            if (!data.class_id) {
                this.$message.error('请选择文章分类')
                return false
            }
            if (!data.item_name) {
                this.$message.error('请输入文章标题')
                return false
            }
            if (!data.item_image) {
                this.$message.error('请上传文章图片')
                return false
            }
            if (!data.item_practice) {
                this.$message.error('请输入内容')
                return false
            }

            return true
        },
        // 根据id删除文章
        async removeShopById(id) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const { data: res } = await this.$http.post('delAllClassContent', { id: id })
                    if (res.status === 200) {
                        this.getTableList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },
        imageChange(res, file) {
            // this.formSource.item_image = res.url
            console.log(res, file, '=====上传图片的信息')
            this.fileList = file // 图片信息发生变化时 赋值给图
        },
        handleRemove(file) {
            this.fileList = this.fileList.filter((item) => file.uid !== item.uid) // 保留除当前点击图片外的所有图片
        },
        // 放大图片
        handlePictureCardPreview(file) {
            this.viewImage = file.url
            this.dialogVisible = true
        },
        // 由于限制了上传图片的个数 此时提示用户
        exceedChange() {
            this.$message.error('文章图片仅支持上传一张')
        },

        // 接收子组件 富文本编辑器传递过来的参数
        childByValue(val) {
            console.log(val, '接收的数据')
            this.formSource.item_practice = val
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

        // 关闭修改对话框
        editDialogClosed() {
            this.formSource = {
                usershop_id: '', // 创建用户
                class_id: '', // 文章分类
                item_name: '', // 文章标题
                item_image: '', // 文章图片
                item_practice: '', // 内容
                is_recommend: 0, // 当前文章是否被当前用户推荐 1推荐 0未推荐
            }
            this.fileList = []
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