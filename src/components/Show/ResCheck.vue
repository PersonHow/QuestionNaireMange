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
    <div class="namedArea" v-if="this.surveyNamed == true">
        <div class="namedItem">
            <span>Email</span>
            <input type="email" id="inputEmail" :value="this.reserInfo.personalId" disabled>
        </div>
        <div class="namedItem">
            <span>Name</span>
            <input type="text" id="inputName" :value="this.reserInfo.personalName" disabled>
        </div>
        <div class="namedItem">
            <span>Phone</span>
            <input type="text" id="inputPhone" :value="this.reserInfo.personalPhone" disabled>
            <span id="ageSpan">Age</span>
            <select name="" id="inputAge"  disabled>
                <option :value="this.reserInfo.personalAge">{{this.reserInfo.personalAge}}</option>
            </select>
        </div>
    </div>
    <div class="selectArea">
        <div class="selectQuestion" v-for="(item, index) in this.questionArr">
            <p>{{ item.split(",")[0] }}</p>
            <div class="selectAns" v-if="this.ansArr[index].split(',')[0] == '單選'"
                v-for="(elements) in this.ansArr[index].split(',')[1].split(';')">
                <span>{{ elements }}</span>
                <input type="radio" :value="elements" name="ansRadio" :checked="this.replyAnsArr[index] == elements" disabled>

            </div>

            <div class="selectAns" v-else-if="this.ansArr[index].split(',')[0] == '複選'"
                v-for="(elements, nums) in this.ansArr[index].split(',')[1].split(';')">
                <span>{{ elements }}</span>
                <input type="checkbox" :value="elements" :checked="this.replyAnsArr[index].split(',').includes(elements)" disabled>
            </div>
            <div class="selectAns" v-else>
                <textarea name="" id="" cols="30" rows="10" :value="this.replyAnsArr[index]" disabled></textarea>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            questionArr: [],
            ansArr: [],
            replyAndArr: [],

        }
    },
    inject: [
        "survey"
    ],
    props: [
        'reserInfo',
        'surveyNamed',
        'item',
        'replyAnsArr'
    ],
    emits: [
        'backRes'
    ],
    created() {
        this.questionArr = this.survey.surveyQuestions.split("|")
        this.ansArr = this.survey.surveyAnswers.split("|")
        console.log(this.questionArr, this.ansArr)
        this.replyAndArr = this.replyAnsArr;
    },
    updated() {

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

.namedArea {
    width: 100%;
    height: 30dvh;

    .namedItem {
        width: 80%;
        margin: 1% 10%;
        height: 5vh;
        display: flex;
        font-size: 1.5dvw;
        position: relative;
        // justify-content: space-around;

        input {
            width: 20dvw;
            padding-left: 5px;
            position: absolute;
            left: 20%;
            top: 0;
        }

        #inputPhone {
            width: 10.5dvw;
            padding-left: 5px;
        }

        #ageSpan {
            position: absolute;
            left: 60%;
        }

        #inputAge {
            position: absolute;
            left: 70%;
            font-size: 1dvw;

            &:focus {
                outline: 0.5px solid rgb(2, 126, 2);
                border-radius: 2px;
                box-shadow: 0px 0px 8px rgb(86, 201, 86);
            }

            &:hover {
                outline: 0.5px solid rgb(2, 183, 2);
            }
        }
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
                font-size: 2dvw;
            }
        }
    }
}
</style>