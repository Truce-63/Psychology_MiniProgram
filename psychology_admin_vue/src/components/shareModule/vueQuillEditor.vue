<template>
    <!-- 富文本编辑器 -->
    <quill-editor class='.editor' v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
    </quill-editor>
</template>

<script>
export default {
    props: {
        msgObject: String, //这样可以指定传入的类型，如果类型不对，会警告
    },
    data() {
        return {
            content: null, // 富文本编辑器默认内容
            editorOption: {
                // 富文本编辑器配置
                placeholder: '请输入文章主体内容...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block'], //引用，代码块

                        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                        [{ script: 'sub' }, { script: 'super' }], // 上下标
                        [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        [{ direction: 'rtl' }], // 文本方向

                        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

                        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        [{ font: [] }], //字体
                        [{ align: [] }], //对齐方式

                        ['clean'], //清除字体样式
                        ['image', 'video'], //上传图片、上传视频
                    ],
                },
                theme: 'snow', //主题 snow/bubble
            },
        }
    },
    watch: {
        /**
         * 因为在vue生命周期中子组件创建后只会赋一次值，之后父组件数值变化了
         * 子组件的数值也会变化，但显示的数据不会发生改变
         * 所以需要监听父组件传参变化重新赋值让子组件重新赋值
         * 此处的msgObject并不是函数，而是对应的要赋值的变量名msgObject
         */
        msgObject(val) {
            this.content = val
        },
    },
    created() {
        this.content = this.msgObject // 将父组件News.vue页面传递过来的富文本数据赋值
    },
    mounted() {
        this.initTitle()
    },
    methods: {
        // 失去焦点事件
        onEditorBlur($event) {
            // this.$emit("child-by-value", $event.container.innerHTML);
            // console.log($event, '失去焦点')
        },
        // 获得焦点事件
        onEditorFocus($event) {
            // console.log($event, '获得焦点')
        },
        // 内容改变事件
        onEditorChange($event) {
            this.$emit('child-by-value', $event.html)
            console.log($event, '内容改变')
        },
        // 为富文本编辑器设置提示title
        initTitle() {
            const titleConfig = [
                { Choice: '.ql-insertMetric', title: '跳转配置' },
                { Choice: '.ql-bold', title: '加粗' },
                { Choice: '.ql-italic', title: '斜体' },
                { Choice: '.ql-underline', title: '下划线' },
                { Choice: '.ql-header', title: '段落格式' },
                { Choice: '.ql-strike', title: '删除线' },
                { Choice: '.ql-blockquote', title: '块引用' },
                { Choice: '.ql-code', title: '插入代码' },
                { Choice: '.ql-code-block', title: '插入代码段' },
                { Choice: '.ql-font', title: '字体' },
                { Choice: '.ql-size', title: '字体大小' },
                { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
                { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
                { Choice: '.ql-direction', title: '文本方向' },
                { Choice: '.ql-header[value="1"]', title: 'h1' },
                { Choice: '.ql-header[value="2"]', title: 'h2' },
                { Choice: '.ql-align', title: '对齐方式' },
                { Choice: '.ql-color', title: '字体颜色' },
                { Choice: '.ql-background', title: '背景颜色' },
                { Choice: '.ql-image', title: '图像' },
                { Choice: '.ql-video', title: '视频' },
                { Choice: '.ql-link', title: '添加链接' },
                { Choice: '.ql-formula', title: '插入公式' },
                { Choice: '.ql-clean', title: '清除字体格式' },
                { Choice: '.ql-script[value="sub"]', title: '下标' },
                { Choice: '.ql-script[value="super"]', title: '上标' },
                { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
                { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
                { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
                { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
                { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
                { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
                { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
                { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
                { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
                { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
                { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
                { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
                { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
                { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
                { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
                { Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
                { Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
                { Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' },
            ]
            // document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
            for (let item of titleConfig) {
                let tip = document.querySelector('.quill-editor ' + item.Choice)
                if (!tip) continue
                tip.setAttribute('title', item.title)
            }
        },
    },
}
</script>

<style lang="less">
// 此段样式为富文本编辑器汉化样式，请勿修改
.editor {
    line-height: normal !important;
    height: 500px;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
    content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
    content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: '等宽字体';
}
</style>
