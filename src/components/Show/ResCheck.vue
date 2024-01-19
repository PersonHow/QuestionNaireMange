<template>
    <div class="icon" @click="$emit('backRes')">
        <i class="fa-solid fa-arrow-left-long"></i>
        <span>Back</span>
    </div>
    <div class="title">
        <h1>問卷題目：{{ this.survey.surveyTitle }}</h1>
        <span>{{ this.survey.surveyStartTime }}&nbsp;~&nbsp;{{ this.survey.surveyEndTime }}</span>
        <h2>{{ this.survey.surveyContent }}</h2>
    </div>
    <div class="selectArea">
        <div class="selectQuestion" v-for="(item, index) in this.questionArr">
            <p>{{ item.split(",")[0] }}</p>
            <div class="selectAns" v-if="this.ansArr[index].split(',')[0] == '單選'"
                v-for="(elements) in this.ansArr[index].split(',')[1].split(';')">
                <span>{{ elements }}</span>
                <input type="radio" :value="elements" name="ansRadio">

            </div>

            <div class="selectAns" v-else-if="this.ansArr[index].split(',')[0] == '複選'"
                v-for="(elements) in this.ansArr[index].split(',')[1].split(';')">
                <span>{{ elements }}</span>
                <input type="checkbox" :value="elements">
            </div>
            <div class="selectAns" v-else>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
        <!-- <p>{{ this.survey }}</p> -->

    </div>
</template>
<script>
export default {
    data() {
        return {
            questionArr: [],
            ansArr: []
        }
    },
    inject: [
        "survey"
    ],
    created() {
        this.questionArr = this.survey.surveyQuestions.split("|")
        this.ansArr = this.survey.surveyAnswers.split("|")
        console.log(this.questionArr, this.ansArr)
    }
}
</script>
<style lang="scss" scoped>
.icon {
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 20px;
    color: rgb(73, 105, 69);
    cursor: pointer;
    z-index: 1;

    &:hover {
        // home 頁相關動畫
        color: rgb(227, 245, 222);
        text-shadow: 1px 0px 10px rgb(18, 83, 15),
            0px 0px 5px rgb(18, 83, 15);
        transition: text-shadow 0.5s;
    }
}

.title {
    width: 100%;
    height: 30%;
    text-align: center;
    position: relative;
    padding-right: 20%;

    span {
        position: absolute;
        right: 20%;
        top: 10%;
    }
}

.selectArea {
    width: 100%;
    height: 60%;
    // overflow-y: scroll;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;

    .selectQuestion {
        width: 100%;
        height: auto;
        font-size: 22pt;
        font-weight: 700;
        text-align: center;
        padding-right: 10%;

        .selectAns {
            width: 100%;
            position: relative;
            // display: flex;
            // align-items: center;
            // justify-content: center;

            span {
                position: absolute;
                top: 0px;
                left: 30%;
            }

            input {
                width: 30px;
                height: 46px;
            }

            textarea {
                width: 500px;
                height: 150px;
                resize: none;
                padding-top: 10px;
                padding-left: 10px;
            }
        }
    }
}
</style>