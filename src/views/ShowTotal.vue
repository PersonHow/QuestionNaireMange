<template>
    <div class="bigArea">
        <h1>{{ this.$route.params.id }}</h1>
        <h1>{{ this.survey.surveyTitle }}</h1>
        <div class="questions" v-for="(item, index) in this.totalQuestions">
            <!-- <h3>{{ this.totalAnswers[index] }}</h3> -->
            <v-chart class="chart" :option="this.optionArr[index]" autoresize />
        </div>
    </div>
</template>
<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref } from 'vue';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

export default {
    data() {
        return {
            // 問卷資訊
            survey: {},
            // 問卷有幾個問題
            totalQuestions: [],
            // 問卷的問題選項
            totalAnswers: [],
            // 統計圖需要的選項圖
            optionArr: [],
            // 統整回應
            replyAns: []
        }
    },
    props: [
        'show',
        'id'
    ],
    methods: {
        showAllReplys() {
            {
                fetch("http://localhost:8080/questionNaire/getSurveyReplys", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        surveyId: this.$route.params.id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        data.replyList.forEach(item => {
                            this.replyAns.push(item.surveyResAns)
                        })

                    })
                    .catch(error => console.log(error))
            }
        },
        showSurveyInfo() {
            fetch("http://localhost:8080/qeustionNaire/getSurveyInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: this.$route.params.id
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.survey = data;
                    this.totalQuestions = this.survey.surveyQuestions.split("|")
                    this.totalAnswers = this.survey.surveyAnswers.split('|')

                    this.totalQuestions.forEach((item, index) => {
                        let option = {
                            title: {
                                // 放題目
                                text: 'Traffic Sources',
                                left: 'center',
                                // 標題的文字大小
                                textStyle: {
                                    fontSize:24,
                                },
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)',
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                // 左邊選項的文字大小
                                textStyle: {
                                    fontSize:20,
                                },
                                data: [],
                            },
                            series: [
                                {
                                    // 屬標移過去的標題名稱，一樣放題目
                                    name: 'Traffic Sources',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    // 選項與統計值放這
                                    data: [
                                        // { value: 335, name: 'Direct' },
                                        // { value: 310, name: 'Email' },
                                        // { value: 234, name: 'Ad Networks' },
                                        // { value: 135, name: 'Video Ads' },
                                        // { value: 1548, name: 'Search Engines' },
                                    ],
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                    },
                                     // 圖示的文字大小
                                    label: {
                                        fontSize: 20,
                                    }
                                },
                            ],
                        };
                        // 把每題的題目放到統計圖的標題上
                        option.title.text = item.split(',')[0]
                        // 屬標移到圖上時，會顯示該題的題目
                        option.series[0].name = item.split(',')[0]

                        // 將題目的選項填入統計圖中
                        if (this.totalAnswers[index].split(',')[0] !== '簡答') {
                            this.totalAnswers[index].split(',')[1].split(';').forEach((ele, nums) => {
                                let seriesObj = {
                                    value: 0,
                                    name: ''
                                }
                                seriesObj.name = ele
                                option.series[0].data.push(seriesObj)
                                option.legend.data.push(ele)
                            })
                        }

                        this.optionArr.push(option)

                    })
                    console.log(this.optionArr);
                    // 重新整理回應的資料格式
                    let replyDates = []
                    this.replyAns.forEach((item, index) => {
                        this.replyAns[index] = item.split('|')
                        replyDates.push([])
                    })
                    // 把資料格式放進新的陣列供圓餅圖使用
                    replyDates.forEach((item, index) => {
                        this.replyAns.forEach((ele, inds) => {
                            item.push(ele[index])
                        })
                    })
                    console.log(replyDates);
                    // this.totalAnswers 回答的類型
                    console.log(this.totalAnswers)
                    // 開始根據各回答類型塞入數據
                    replyDates.forEach((item, index) => {
                        if (this.totalAnswers[index].includes('簡答')) {
                            item.forEach(single => {
                                let seriesObj = {
                                    value: 1,
                                    name: ""
                                }
                                seriesObj.name = single
                                this.optionArr[index].series[0].data.push(seriesObj)
                                this.optionArr[index].legend.data.push(single)
                            })
                        } else if (this.totalAnswers[index].includes('單選')) {
                            item.forEach(single => {
                                this.optionArr[index].series[0].data.forEach(tar => {
                                    if (single == tar.name) {
                                        tar.value += 1;
                                    }
                                })
                            })
                        } else { // 複選的答案計算
                            item.forEach(single => {
                                this.optionArr[index].series[0].data.forEach(tar => {
                                    if (single.includes(tar.name)) {
                                        tar.value += 1;
                                    }
                                })
                            })
                            console.log('複選');

                        }
                    })



                })
                .catch(error => console.log(error))


        },

    },
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },
    setup() {
        const option = ref({
            title: {
                text: 'Traffic Sources',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            series: [
                {
                    name: 'Traffic Sources',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: 'Direct' },
                        { value: 310, name: 'Email' },
                        { value: 234, name: 'Ad Networks' },
                        { value: 135, name: 'Video Ads' },
                        { value: 1548, name: 'Search Engines' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(255, 255, 255, 0.5)',
                        },
                    },
                },
            ],
        });

        return { option };
    },
    created() {
        this.showAllReplys()
        this.showSurveyInfo()
        console.log(this.show);
    },
    mounted() {
        console.log(this.option);
    }
}
</script>
<style lang="scss" scoped>
.bigArea {
    width: 100dvw;
    height: 100dvh;

    .questions {
        width: 60dvw;
        height: 70dvh;
        margin: 5dvh 20dvw;

    }
}
</style>