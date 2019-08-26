<template>
    <div>
        <p>my name is: <input type="text" v-model="name"></p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        private name: string | null = localStorage.getItem('name');
        private alert = () => {
            console.log(this)
        };
        mounted(){
            this.alert()
        }
    }
</script>

<style scoped>

</style>
