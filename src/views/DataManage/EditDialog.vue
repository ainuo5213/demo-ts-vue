<template>
    <el-dialog
            title="编辑课程"
            :close-on-click-modal="false"
            :visible="showDialog"
            :show-close="false"><!-- sync修饰符：父子组件数据双向绑定 -->
        <el-form :rules="rules" :model="form" ref="ruleForm" label-width="100px" size="small" class="form-box">
            <el-form-item label="课程名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="level">
                <el-select v-model="form.level" placeholder="请选择课程等级" value="">
                    <el-option label="初级" value="初级"></el-option>
                    <el-option label="中级" value="中级"></el-option>
                    <el-option label="高级" value="高级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报名人数" prop="count">
                <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
            </el-form-item>
            <el-form-item label="上线时间" prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="技术栈" prop="type">
                <el-radio-group v-model="form.type">
                    <template v-for="radio in radios">
                        <el-radio :label="radio" name="type"></el-radio>
                    </template>
                </el-radio-group>
            </el-form-item>
            <span class="dialog-footer">
                <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
                <el-button :loading="loading" type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
            </span>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Provide} from "vue-property-decorator";
    import {AxiosResponse} from 'axios'
    import {FormData} from '@/store/types'

    @Component({
        components: {}
    })
    export default class EditDialog extends Vue {
        // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
        // provide 提供的页面所需的静态变量不是data
        @Prop(Boolean) showDialog!: boolean;
        @Prop(Object) formData;
        private form: FormData = {
            title: '',
            type: '',
            level: '',
            count: '',
            date: '',
            _id: '',
        };
        @Provide('radios') radios = ['vue', 'node', '小程序', 'angular', 'react', 'jquery'];

        created() {
            // 不让父子组件双向绑定
            this.form = {...this.formData};
        }

        @Provide('rules') rules: any = {
            title: [
                {
                    required: true,
                    message: '请输入课程名称',
                    trigger: 'blur'
                }
            ],
            level: [
                {
                    required: true,
                    message: '请选择课程等级',
                    trigger: 'change'
                }
            ],
            count: [
                {
                    required: true,
                    message: '请输入报名人数',
                    trigger: 'blur'
                }
            ],
            date: [
                {
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }
            ],
            type: [
                {
                    required: true,
                    message: '请选择技术栈',
                    trigger: 'change'
                }
            ],
        };
        @Provide('loading') loading: boolean = false;

        submitForm(formName: string): void {
            let form = <any>this.$refs[formName];
            form.validate((valid: boolean) => {
                if (valid) {
                    this.loading = true;
                    (this as any).axios.post(`/api/profiles/edit/${this.form._id}`, this.form)
                        .then((res: AxiosResponse) => {
                            this.$message({duration: 2000, message: res.data.msg, type: "success"});
                            this.loading = false;
                            // 合并formData和form
                            this.formData = Object.assign(this.formData, this.form);
                            this.$emit('closeDialog')
                        })
                        .catch((res: AxiosResponse) => {
                            this.loading = false;
                            this.$emit('closeDialog');
                            this.$message({duration: 2000, message: res.data.msg, type: "error"});
                        })
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    .form-box {
        overflow: hidden;

        .el-input,
        .el-select {
            width: 200px !important;
        }
    }

    .dialog-footer {
        float: right;
    }
</style>
