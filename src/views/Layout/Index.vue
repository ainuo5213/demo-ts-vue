<template>
    <div class="layout">
        <!-- 头部 -->
        <LayoutHeader/>
        <!-- 内容 -->
        <Content>
            <!-- 侧边栏导航卡槽 -->
            <SideBar slot="left"></SideBar>
            <!-- 侧边栏导航的路由出口 -->
            <router-view slot="content"/>
        </Content>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import LayoutHeader from './header.vue'
    import Content from './content.vue'
    import SideBar from './sidebar.vue'
    @Component({
        components: {LayoutHeader, Content, SideBar},
    })
    export default class Layout extends Vue {
    }
</script>

<style lang="less" scoped>
    .layout {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
    }
</style>
