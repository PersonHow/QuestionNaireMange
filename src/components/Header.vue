<template >
    <div class="closeArea" :class="{ 'showArea': this.show === true }">
        <div class="routeItem barIcon">
            <span class="barText">動態問券前台</span>
            <i class="fa-solid fa-server barItem"></i>
        </div>
        <RouterLink to="/" class="routeItem" :class="{ 'locationCss': this.location === 1 }">
            <span>Home</span>
            <i class="fa-solid fa-house"></i>
        </RouterLink>
        <div class="searchArea">
            <n-date-picker v-model:value="this.rangeStart" type="date" clearable class="dateSelect"
                placeholder="Start Time" />
            <h1>&nbsp;~&nbsp;</h1>
            <n-date-picker v-model:value="this.rangeEnd" type="date" clearable class="dateSelect" placeholder="End Time" />
            <input type="text" placeholder="搜尋問卷標題" v-model="this.titleText">
            <i class="fa-solid fa-magnifying-glass" @click="this.doSearch()"></i>
        </div>
        <div class="editArea">
            <i class="fa-regular fa-square-plus" @click="$router.push('/AddView')"></i>
            <i class="fa-solid fa-trash" text-stroke="\f1f8"></i>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import location from "../stores/location";
import survey from "../stores/survey";
import { RouterLink, RouterView } from 'vue-router'
import { NDatePicker } from 'naive-ui';
export default {
    data() {
        return {
            showBar: false,
            rangeStart: [],
            rangeEnd: [],
            titleText: "",
        }
    },
    props: [
        "show"
    ],
    computed: {
        ...mapState(location, ['location', 'locationInfo']),
    },
    components: {
        RouterLink,
        NDatePicker
    },
    methods: {
        ...mapActions(survey, ['setSearchValue', 'searchSurveyInfo']),
        doSearch() {
            let startText = ""
            let endText = ""
            console.log(this.rangeEnd);
            if (this.range !== null) {
                let startTime = new Date(this.rangeStart)
                let endTime = new Date(this.rangeEnd)
                // 確保月份時間格式小於 10，補上 0 以便符合送入後端的 localDate 格式
                let startMonth = "";
                let endMonth = "";
                if ((startTime.getMonth() + 1) < 10) {
                    startMonth = `0${startTime.getMonth() + 1}`
                } else {
                    startMonth = startTime.getMonth() + 1
                }
                if ((endTime.getMonth() + 1) < 10) {
                    endMonth = `0${endTime.getMonth() + 1}`
                } else {
                    endMonth = endTime.getMonth() + 1
                }

                // 確保日期時間格式小於 10，補上 0 以便符合送入後端的 localDate 格式
                let startDate = "";
                let endDate = "";
                if (startTime.getDate() < 10) {
                    startDate = `0${startTime.getDate()}`
                } else {
                    startDate = startTime.getDate();
                }
                if (endTime.getDate() < 10) {
                    endDate = `0${endTime.getDate()}`
                } else {
                    endDate = endTime.getDate();
                }

                // 將時間格式組成後端需求
                startText = `${startTime.getFullYear()}-${startMonth}-${startDate}`
                endText = `${endTime.getFullYear()}-${endMonth}-${endDate}`
                if (startText == endText || endText == 'NaN-NaN-NaN') {
                    endText = ""
                }
                if (startText == 'NaN-NaN-NaN') {
                    startText = ""
                }
                console.log(startText)
                console.log(endText)
            }
            if (this.rangeStart == "NaN-NaN-NaN" && this.rangeEnd == "NaN-NaN-NaN") {
                startText = ""
                endText = ""
            }
            this.setSearchValue(this.titleText, startText, endText)
            this.searchSurveyInfo();
        },
        conDate() {
            const datePicker = document.querySelector(".dateSelect")
            console.dir(datePicker)
        }
    },
    updated() {
        // this.transDate()
    },
}
</script>
<style lang="scss" scoped>
$bg: rgb(255, 255, 255);

.closeArea {
    width: 100%;
    height: 100%;
    padding-left: 50px;
    display: flex;
    background: $bg;
    align-items: center;
    position: relative;
    transition: height 1s, display 1s;
    border-bottom: 1px solid rgb(136, 159, 134, 0.6);
    z-index: 1;

    .searchArea {
        width: 200px;
        height: 100%;
        position: relative;

        .dateSelect {
            width: 2dvw;
            opacity: 0;
        }

        input {
            opacity: 0;
        }

        i {
            position: absolute;
            color: rgba(100, 102, 100);
            left: 0;
            top: 1.5dvh;
            font-size: 2dvw;
            display: block;
            transition: left 1s;
        }

        h1 {
            opacity: 0;
        }
    }

    .routeItem {
        width: 12%;
        height: 100%;
        font-size: 20pt;
        color: rgba(100, 102, 100);
        position: relative;

        .barItem {
            position: absolute;
            top: 1dvh;
            font-size: 2.7dvw;
            color: rgba(100, 102, 100);
        }

        i {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 10px;
            left: 10px;
            font-size: 2dvw;
        }

        span {
            position: absolute;
            top: 10px;
            left: 0;
            opacity: 0;
            transition: opacity 1s, left 1s;
        }

        &:hover {
            color: rgb(227, 245, 222);
            text-shadow: 1px 0px 10px rgb(18, 83, 15);
            transition: text-shadow 1s;
        }

        .fa-bars-progress {
            text-shadow: none;
        }

    }

    .barIcon {
        width: 15%;

        &:hover {
            text-shadow: none;
        }
    }

    .editArea {
        opacity: 0;
    }
}

.showArea {
    width: 100%;
    height: 100%;
    display: flex;
    background: $bg;
    align-items: center;
    position: relative;
    transition: height 1s, display 1s;
    z-index: 1;

    .routeItem {
        width: 12%;
        height: 100%;
        font-size: 2dvw;
        color: rgba(100, 102, 100);
        position: relative;

        .barItem {
            // 標題圖示
            font-size: 2.7dvw;
            text-shadow: none;
            color: rgba(100, 102, 100);
        }

        .barText {
            // 標題文字
            font-size: 1.5dvw;
            text-shadow: none;
            font-family: 'Noto Sans TC', sans-serif;
            color: rgba(100, 102, 100);


        }

        i {
            // 圖示移動的動畫
            position: absolute;
            width: 40px;
            height: 40px;
            top: 10px;
            left: 10px;
            opacity: 1;
            transition: opacity 1s;
        }

        span {
            // Header　移動的動畫
            position: absolute;
            top: 10px;
            left: 25%;
            display: block;
            animation: textUp linear 0.5s;
            opacity: 1;
        }

        &:hover {
            // home 頁相關動畫
            color: rgb(227, 245, 222);
            text-shadow: 1px 0px 10px rgb(18, 83, 15),
                0px 0px 5px rgb(18, 83, 15);
            transition: text-shadow 0.5s;
        }

    }

    .barIcon {
        width: 16%;

        &:hover {
            text-shadow: none;
        }
    }

    .searchArea {
        // 搜尋區域
        width: 55%;
        height: 80%;
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 30px;

        h1 {
            opacity: 1;
        }

        i {
            //放大鏡移動
            position: absolute;
            top: 10px;
            left: 99%;
            transition: left 1s;
            cursor: pointer;

            &:hover {
                //  圖示相關動畫
                color: rgb(227, 245, 222);
                text-shadow: 1px 0px 8px rgb(18, 83, 15);
                transition: text-shadow 0.5s;
            }
        }

        input {
            //搜尋欄
            height: 5dvh;
            width: 25dvw;
            margin: 0 20px;
            font-size: 3dvh;
            padding: 5px;
            opacity: 1;
            animation: textUp linear 1.5s;
        }

        input::placeholder {
            text-align: center;
        }

        .dateSelect {
            // 時間欄
            opacity: 1;
            width: 12dvw;
            animation: textUp linear 1s;
        }
    }

    .editArea {
        // 垃圾桶與新增
        width: 10%;
        height: 80%;
        opacity: 1;
        transition: opacity 0.5s;
        position: relative;
        color: rgba(100, 102, 100);
        font-size: 22pt;

        i {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 10px;
            cursor: pointer;

            &:hover {
                //  圖示相關動畫
                color: rgb(227, 245, 222);
                text-shadow: 1px 0px 8px rgb(18, 83, 15);
                transition: text-shadow 0.5s;
            }
        }

        .fa-square-plus {
            left: 20px;
        }

        .fa-trash {
            left: 60px;


        }
    }
}


@keyframes textUp {
    0% {
        opacity: 0;
        transform: translate(-15px, 0px);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}
</style>