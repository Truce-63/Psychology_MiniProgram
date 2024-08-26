<template>
<div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
        <el-breadcrumb-item>题目管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入题目" v-model="problem_title" clearable @clear="getTimuList()">
                    <el-button slot="append" icon="el-icon-search" @click="getTimuList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="openModal(true)">新增题目</el-button>
            </el-col>
        </el-row>

        <!-- 题目列表区域 -->
        <el-table :data="tableList" border stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="题目名称" prop="problem_title"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template v-slot="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="openModal(false, scope.row)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeClass(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <!-- 新增 & 修改题目内容区域 -->
    <el-dialog :title="isAdd ? '新增题目' : '修改题目'" :visible.sync="isModal" width="66%" @close="closeModal">
        <el-form :model="formSource" ref="formSource" label-width="90px" :rules="rules">
            <el-form-item label="题目" prop="problem_title" label-width="160px" required>
                <el-input v-model="formSource.problem_title" placeholder="请输入题目"></el-input>
            </el-form-item>

            <el-form-item label="题目类型" prop="problem_type" label-width="160px" required>
                <el-select v-model="formSource.problem_type" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="题目选项" prop="problem_option" label-width="160px" required>
                <el-form-item 
                  style="margin-bottom: 8px" 
                  v-for="(item, index) in formSource.problem_option" 
                  :label="'选项' + (index + 1)" 
                  :key="index" 
                  :prop="'problem_option.' + index + '.option_name'" 
                  >
                    <el-input v-model="item.option_name" style="width: 40%; margin-top: 15px;" placeholder="请输入选项"></el-input>
                    <span style="margin: 0 16px">分数</span>
                    <el-input 
                      type="number" 
                      v-model="item.option_score" 
                      style="width: 40%;" 
                      placeholder="请选择分数" 
                      ></el-input>
                    <el-button @click.prevent="removeIngredients(item)" style="margin-left: 10px;margin-top: 15px">
                        删除
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 90px; margin-top:15px" @click="addIngredients">
                        新增选项
                    </el-button>
                </el-form-item>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setClass">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            options: [{
                    value: 0,
                    label: '双相情感障碍测试'
                },
                {
                    value: 1,
                    label: '人格测评'
                },
                {
                    value: 2,
                    label: '智力测试'
                },
                {
                    value: 3,
                    label:'职业人格测试'
                }
            ],
            isAdd: true, // 是否为新增题目 默认是
            tableList: [], // 表格数据源
            isModal: false, // 控制对话框的显示与隐藏

            formSource: {
                id: null, // 题目id
                problem_title: '', // 题目名称
                problem_type: null,
                problem_option: [{
                    option_name: '',
                    option_score: null
                }]
            }, // 表单数据
            rules: {
                problem_title: [{
                    required: true,
                    message: '题目不能为空!',
                    trigger: 'blur'
                }],
                problem_type: [{
                    required: true,
                    message: '请选择题目类型',
                    trigger: 'change'
                }],
                problem_option: [
                {
                  validator: (rule, value, callback) => {
                    if (!value || !value.length) {
                      callback(new Error('必须至少添加一个选项'));
                    } else {
                      // Check if all options and scores are valid
                      for (const option of value) {
                        if (!option.option_name || option.option_score < 0) {
                          callback(new Error('所有选项和分数不能为空，且分数必须大于等于0'));
                          return;
                        }
                      }
                      callback();
                    }
                  },
                  trigger: 'blur'
                }
              ]
            }
        };
    },
    created() {
        this.getTimuList(); // 获取题目
    },
    methods: {
        validateScore(value) {
            if (value <= 0) {
                this.item.option_score = ''; // 清空输入框
                // 或者可以弹出提示
                this.$message.warning('请输入大于0的数值');
            }
        },
        removeIngredients(item) {
            const index = this.formSource.problem_option.indexOf(item);
            if (index !== -1) {
                this.formSource.problem_option.splice(index, 1);
            }
        },
        addIngredients() {
            this.formSource.problem_option.push({
                option_name: '',
                option_score: null
            });
        },
        async getTimuList() {
            const {
                data: res
            } = await this.$http.post('getTimuList', {});
            if (res.status === 200) {
                this.tableList = (res['data'] || []).map((item) => ({
                    ...item,
                    problem_option: JSON.parse(item.problem_option)
                }));
            } else {
                this.$message.error(res.msg);
            }
        },
        openModal(type, data) {
            this.isAdd = type;
            this.isModal = true;
            // 清空表单验证状态
            this.$nextTick(() => {
              this.$refs.formSource.clearValidate();
            });
            if (!type) {
                // 如果是编辑，那么拿一下编辑的内容
                this.formSource = JSON.parse(JSON.stringify(data));
            }
        },
        // async setClass() {
        //     let paramsData = {
        //         ...this.formSource,
        //         problem_option: JSON.stringify(this.formSource.problem_option)
        //     };
        //     if (this.isAdd) {
        //         // 新增题目
        //         const {
        //             data: res
        //         } = await this.$http.post('addTimuList', paramsData);
        //         if (res.status === 200) {
        //             this.isModal = false;
        //             this.getTimuList();
        //         } else {
        //             this.$message.error(res.msg);
        //         }
        //     } else {
        //         // 修改题目
        //         const {
        //             data: res
        //         } = await this.$http.post('updateTimuList', paramsData);
        //         if (res.status === 200) {
        //             this.isModal = false;
        //             this.getTimuList();
        //         } else {
        //             this.$message.error(res.msg);
        //         }
        //     }
        // },
        async setClass() {
          // 先进行表单验证
          this.$refs.formSource.validate(async (valid) => {
            if (valid) {
              // 验证通过，准备数据
              let paramsData = {
                ...this.formSource,
                problem_option: JSON.stringify(this.formSource.problem_option)
              };

              try {
                if (this.isAdd) {
                  // 新增题目
                  const { data: res } = await this.$http.post('addTimuList', paramsData);
                  if (res.status === 200) {
                    this.isModal = false;
                    this.getTimuList();
                  } else {
                    this.$message.error(res.msg);
                  }
                } else {
                  // 修改题目
                  const { data: res } = await this.$http.post('updateTimuList', paramsData);
                  if (res.status === 200) {
                    this.isModal = false;
                    this.getTimuList();
                  } else {
                    this.$message.error(res.msg);
                  }
                }
              } catch (error) {
                this.$message.error('请求失败，请稍后再试');
                console.error(error);
              }
            } else {
              // 验证失败，提示用户
              this.$message.error('请检查表单内容');
            }
          });
        },
        removeClass(data) {
            this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消', 
                    type: 'warning'
                })
                .then(async () => {
                    const {
                        data: res
                    } = await this.$http.post('delTimuList', {
                        id: data.id
                    });
                    if (res.status === 200) {
                        this.getTimuList();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(() => {});
        },
        closeModal() {
            this.formSource = {
                id: null,
                problem_title: '',
                problem_type: null,
                problem_option: [{
                    option_name: '',
                    option_score: null
                }]
            };
        }
    }
};
</script>

<style lang="less" scoped>
/* 可以在此处添加样式 */
</style>
