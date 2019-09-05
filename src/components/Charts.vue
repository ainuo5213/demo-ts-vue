<template>
    <div ref="myCharts" class="chart" :style="{width: chartsWidth, height: chartsHeight}">
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide, Prop, Ref} from 'vue-property-decorator'
    import echarts from 'echarts'

    @Component({
        components: {},
    })
    export default class ChartsData extends Vue {
        @Provide('tabPosition') tabPosition: string = 'line';
        @Prop({type: String, default: 'line'}) readonly chartsType !: string;
        @Prop({type: Object}) readonly chartsData !: object | null;
        @Provide('chartsWidth') chartsWidth: string = "";
        @Provide('chartsHeight') chartsHeight: string = "";
        @Provide('charts') charts: any;

        private generateWidthHeight() {
            // 生成图表的宽高
            this.chartsWidth = document.body.offsetWidth * 0.8 + 'px';
            this.chartsHeight = document.body.offsetHeight * 0.6 + 'px';
        }

        created(): void {
            this.generateWidthHeight()
        }

        mounted() {
            // 实例化eCharts对象
            this.drawCharts()
        }

        destroyed () {
            this.charts = null;
        }

        private drawCharts() {
            this.charts = echarts.init((this as any).$refs['myCharts'] as HTMLCanvasElement);
            if (this.charts === undefined) {
                console.log('eCharts dom is failed');
                return;
            }
            switch (this.chartsType) {
                case "line":
                    this.charts.setOption((this as any).generateLineOption());
                    break;
                case "bar":
                    this.charts.setOption((this as any).generateBarOption());
                    break;
                case "pie":
                    this.charts.setOption((this as any).generatePieOption());
                    break;
                default:
                    this.charts.log('chartType is not valid');
                    break;
            }
        }

        private generatePieOption(): object {
            // 处理数据
            let pieData = [];
            for (const index in (this as any).chartsData.xAxisData) {
                pieData.push({name: (this as any).chartsData.xAxisData[index], value: (this as any).chartsData.yAxisData[index] })
            }
            return {
                title: {
                    text: '近一周学习量',
                    subtext: "test",
                    x: "center"
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: (this as any).chartsData.xAxisData
                },
                series : [
                    {
                        name: 'weekday',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: pieData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }

        private generateBarOption() {
            return {
                title: {
                    text: '近一周学习量',
                    subtext: "test",
                    x: "center"
                },
                xAxis: {
                    type: 'category',
                    data: this.chartsData.xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.chartsData.yAxisData,
                    type: this.chartsType,
                    barWidth: "20%"
                }],
                color: ['#33958d'],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "line",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
            }
        }

        private generateLineOption(): object {
            // 绘制折线图
            return {
                xAxis: {
                    type: 'category',
                    data: this.chartsData.xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.chartsData.yAxisData,
                    type: this.chartsType,
                    smooth: true
                }],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                title: {
                    text: '近一周学习量',
                    subtext: "test",
                    x: "center"
                },
            }
        }
    }
</script>

<style scoped>

</style>
