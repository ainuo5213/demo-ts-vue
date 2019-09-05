<template>
    <!-- 页面导航超过屏幕大小时，启用滚动 -->
    <el-scrollbar class="el-scrollbar">
        <!-- 侧边栏 -->
        <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router>
            <!-- 循环渲染router -->
            <template v-for="router in routers" v-if="router.hidden && router.children && router.children.length">
                <!-- children只有一个的（redirect的情况） -->
                <el-menu-item :index="router.children[0].path" v-if="router.children.length === 1" :key="router.name">
                    <i :class="router.children[0].meta.icon"></i>
                    <span>{{router.children[0].meta.title}}</span>
                </el-menu-item>
                <!-- children超过一个的情况 -->
                <el-submenu :index="router.children[0].path" :key="router.name" v-else>
                    <!-- 插入一个slot -->
                    <template slot="title">
                        <i :class="router.meta && router.meta.icon"></i>
                        <span>{{router.meta.title}}</span>
                    </template>
                    <el-menu-item v-for="child in router.children" :key="child.name" :index="child.path">
                        <i :class="child.meta && child.meta.icon"></i>
                        <span>{{child.meta.title}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import {Getter} from 'vuex-class';

    @Component({
        components: {},
    })
    export default class SideBar extends Vue {
        @Getter('routers') routers: any;
    }
</script>

<style lang="less" scoped>
    .el-scrollbar {
        height: 100%;
        border-right: 1px solid #e6e6e6;
        background: #fff;

        .el-menu-slide {
            border-right: none;

            i {
                margin-right: 5px;
                width: 24px;
                text-align: center;
                font-size: 18px;
            }
        }
    }
</style>
