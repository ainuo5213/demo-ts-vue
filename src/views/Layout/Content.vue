<template>
    <el-container class="layout-content">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <slot name="left"></slot>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
            <!-- 面包屑导航 -->
            <div class="top">
                <i class="fa fa-reorder"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item
                            v-for="(breadCrumbItem, index) in breadCrumbItems"
                            :to="breadCrumbItem.path"
                            :key="index">
                        {{breadCrumbItem.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 页面内容 -->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
    import {Vue, Component, Watch, Provide} from 'vue-property-decorator'

    interface Route {
        path: string;
        title: string;
    }

    @Component({})
    export default class Content extends Vue {
        @Provide('breadCrumbItems') breadCrumbItems: Route[]; //面包屑的数组
        private initBreadCrumbItems(router: any): void {
            // 根路由的title
            let breadCrumbItems: Route[] = [{path: '/', title: '后台管理'}];
            // 遍历父级到当前子路由的title和path，存储到当前数组
            for (let item of router.matched) {
                if (item.meta && item.meta.title) {
                    const {path = '/', meta: {title}} = item;
                    breadCrumbItems.push({path, title})
                }
            }
            this.breadCrumbItems = breadCrumbItems
        }

        // 监听路由变化
        @Watch('$route') handleRouteChange(to: any) {
            this.initBreadCrumbItems(to)
        }

        private created() {
            this.initBreadCrumbItems(this.$route)
        }
    }
</script>

<style lang="less" scoped>
    .layout-content {
        width: 100%;
        height: 100%;

        .el-main {
            padding: 0;

            .top {
                background: #fff;
                height: 54px;
                border-right: none;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;

                i {
                    font-size: 20px;
                    cursor: pointer;
                    padding-left: 16px;
                }

                .breadcrumb {
                    padding-left: 16px;
                }
            }

            .content {
                padding: 10px;
                height: calc(100% - 54px);
                box-sizing: border-box;
            }
        }
    }
</style>
