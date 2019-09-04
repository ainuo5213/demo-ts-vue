<template>
    <router-view/>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {SET_USER} from './store/types'
    import {Action} from 'vuex-class'
    @Component({
        components: {}
    })
    export default class App extends Vue {
        @Action(SET_USER) setUser: any;
        created () {
            this.setUser(localStorage.getItem('tsToken'))
        }
    }
</script>

<style lang="less">

</style>
