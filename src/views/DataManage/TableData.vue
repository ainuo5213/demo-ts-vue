<template>
    <div class="table-data">
        <div class="search-box">
            <el-input size="small" v-model="searchValue" placeholder="请输入课程名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :data="tableData"
                border
                style="width: 100%"
                :height="tHeight"
                class="table-box">
            <el-table-column label="#" prop="_id" width="240"></el-table-column>
            <el-table-column label="课程名称" prop="title"></el-table-column>
            <el-table-column label="课程等级" width="120" prop="level"></el-table-column>
            <el-table-column label="技术栈" width="120" prop="type"></el-table-column>
            <el-table-column label="报名人数" width="120" prop="count"></el-table-column>
            <el-table-column label="上线日期" width="160" prop="date"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages" ref="page-box">
            <el-pagination
                    @size-change="handelSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 20]"
                    :page-size="size"
                    :total="total"
                    layout="total, sizes, pager, jumper, prev, next">
            </el-pagination>
        </div>
        <!-- 父子传参，自定义事件 -->
        <EditDiaLog v-if="showDialog" :showDialog="showDialog" :formData="formData" @closeDialog="closeDialog"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide} from 'vue-property-decorator'
    import {AxiosResponse} from 'axios'
    import EditDiaLog from './editDialog.vue'
    import {FormData} from '@/store/types'

    @Component({
        components: {EditDiaLog},
    })
    export default class TableData extends Vue {
        @Provide('searchValue') searchValue: string = ''; // 搜索框
        @Provide('tHeight') tHeight: number = document.body.offsetHeight - 270;
        @Provide('tableData') tableData: any = []; // 表格数据
        @Provide('page') page: number = 1; // 当前页数
        @Provide('size') size: number = 5; // 每一页大小
        @Provide('total') total: number = 0; //总条数
        @Provide('loading') loading: boolean = false; // loading动画
        @Provide('showDialog') showDialog: boolean = false; // 展示编辑页面
        @Provide('formData') formData: FormData = {
            title: '',
            type: '',
            level: '',
            count: '',
            date: ''
        };

        closeDialog(): void {
            this.showDialog = false
        }

        handleDelete(index: number, row: any): void {
            this.$confirm('确定要删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                (this as any).axios.delete(`/api/profiles/delete/${row._id}`)
                    .then((res: AxiosResponse) => {
                        this.$message({
                            type: 'success',
                            duration: 2000,
                            message: res.data.msg
                        });
                        this.loadData();
                    });
            }).catch(() => {

            })
        }

        loadData(): void {
            this.loading = true;
            (this as any).axios.get(`api/profiles/loadMore/${this.page}/${this.size}`)
                .then((res: AxiosResponse) => {
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading = false;
                })
        }

        handleEdit(index: number, row: any): void {
            this.formData = row;
            this.showDialog = true;
        }

        handelSizeChange(value: number): void {
            this.size = value;
            this.page = 1;
            this.searchValue ? this.loadSearchData() : this.loadData();
        }

        handleSearch(): void {
            this.page = 1;
            this.searchValue ? this.loadSearchData() : this.loadData();
        }

        loadSearchData(): void {
            this.loading = true;
            (this as any).axios.get(`/api/profiles/search/${this.searchValue}/${this.page}/${this.size}`).then((res: AxiosResponse) => {
                this.tableData = res.data.datas.list;
                this.total = res.data.datas.total;
                this.loading = false
            })
        }

        handleCurrentChange(curPage: number): void {
            this.page = curPage;
            this.loadData();
        }

        created() {
            this.loadData()
        }
    }
</script>

<style lang="less" scoped>
    .table-data {
        height: 100%;

        .table-box {
            font-size: 14px;
        }

        .pages {
            background: #fff;
            margin-top: 10px;
            padding: 10px 10px;
            text-align: right;
            height: 55px;
            box-sizing: border-box;
        }

        .search-box {
            background: #fff;
            margin-bottom: 10px;
            padding: 10px 10px;
            border-radius: 4px;
            height: 55px;
            box-sizing: border-box;

            .el-input {
                width: 200px;
                margin-right: 10px;
            }
        }
    }
</style>
