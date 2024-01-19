
<template>
    <div class="checkArea">
        <div class="icon" @click="$emit('backRes')">
            <i class="fa-solid fa-arrow-left-long"></i>
            <span>&nbsp;Back</span>
        </div>
        <h1>問卷編號：{{ this.id }}&nbsp; 確認頁</h1>
        <div class="survey">
            <!-- 問卷標題 -->
            <div class="title">
                <h1>{{ this.title }}</h1>
                <span id="titleTime">{{ this.start }}&nbsp;~&nbsp;{{ this.end }}</span>
                <h2>{{ this.content }}</h2>
            </div>
            <!-- 填寫姓名區 -->
            <div class="namedArea" v-if="this.reserEmail !== undefined">
                <div class="namedItem">
                    <span>Email</span>
                    <input type="email" id="inputEmail" :value="this.reserEmail" disabled>
                </div>
                <div class="namedItem">
                    <span>Name</span>
                    <input type="text" id="inputName" :value="this.reserName" disabled>
                </div>
                <div class="namedItem">
                    <span>Phone</span>
                    <input type="text" id="inputPhone" :value="this.reserPhone" disabled>
                    <span id="ageSpan">Age</span>
                    <select name="" id="inputAge" disabled>
                        <option :value="this.reserAge">{{this.reserAge}}</option>
                    </select>
                </div>
            </div>

            <!-- 問卷選項答案 -->
            <div class="doAns">
                <div class="question" v-for="(item, index) in this.quizs.split('|')">
                    <h1 class="questionTitle" :class="{ 'redText': item.split(',')[1] == '必填' }">{{ item.split(",")[0] }}
                    </h1>
                    <!-- 簡答,|單選,aa;bb;cc|複選,tt;hh;eee -->
                    <div class="selInput" v-for="(elements, nums) in this.selectsArr[index].split(',')[1].split(';')">
                        <textarea v-if="this.selectsArr[index].split(',')[0] == '簡答'" disabled :value="this.res[index]"></textarea>
                        <input type="radio" name="radioAns" :value="elements"
                            v-if="this.selectsArr[index].split(',')[0] == '單選'" disabled
                            :checked="this.res[index] == elements">
                        <input type="checkbox" name="checkboxAns" :value="elements"
                            v-if="this.selectsArr[index].split(',')[0] == '複選'" disabled :checked="this.res[index][nums]">
                        <label for="">{{ elements }}</label>

                    </div>
                </div>
                <!-- <h1>{{ this.res }}</h1> -->

                <button type="button" class="ansDone" @click="$emit('surveyDone')">確認完畢&nbsp;
                    <i class="fa-solid fa-arrow-right-long"></i></button>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            anses: [],
            radioArr: "",
            checkArr: [],
            textArr: ""
        }
    },
    props: [
        'id',
        'title',
        'content',
        'start',
        'end',
        'quizs',
        'selects',
        'res',
        "named",
        'reserEmail',
        'reserName',
        'reserPhone',
        'reserAge',
    ],
    computed: {
        selectsArr() {
            return this.selects.split("|")
        }
    },
    methods: {
        // 自動產生年齡的選項
        creatAgeOption() {
            let ageOption = document.querySelector("#inputAge")
            let ageArr = [];
            for (let i = 0; i < 100; i++) {
                ageArr.push(i)
            }
            ageArr.forEach(item => {
                ageOption.innerHTML += `<option value=${item}>${item}</option>`
            })
        },
        showAns(index, value) {
            this.anses[index] = value;
            console.log(this.anses)
            console.log(this.anses.length)
            console.log(this.anses.join("|"))
        },
    },
}
</script>
<style lang="scss" scoped>
.checkArea {
    width: 100vw;
    height: 160%;
    display: flex;
    flex-direction: column;
    // position: relative;

    .icon {
        position: fixed;
        bottom: 2%;
        left: 10%;
        font-size: 20pt;
        border: 0;
        background: none;
        color: rgb(113, 165, 110);
        border-radius: 5px;
        font-weight: 700;

        &:hover {
            //  圖示相關動畫
            color: rgb(255, 255, 255);
            text-shadow: 0px 0px 8px rgb(24, 98, 21),
                0px 0px 8px rgb(67, 87, 66),
                0px 0px 3px rgb(30, 62, 28),
                0px 0px 16px rgb(184, 232, 182),
                0px 0px 25px rgb(184, 226, 182),
            ;
            transition: text-shadow 0.5s;
        }
    }

    .title {
        width: 100%;
        height: 40%;
        padding: 0 40%;
        position: relative;

        #titleTime {
            position: absolute;
            top: 20px;
            right: 18%;
        }

        h1 {
            font-size: 36pt;
        }

        h2 {
            font-weight: 400;
            position: absolute;
            left: 30%;
        }
    }

    .namedArea {
        width: 100%;
        height: 20dvh;
        padding: 0 30%;
        position: relative;

        .namedItem {
            width: 80%;
            margin: 1% 10%;
            height: 5vh;
            display: flex;
            font-size: 14pt;
            position: relative;
            // justify-content: space-around;

            input {
                padding-left: 5px;
                position: absolute;
                left: 20%;
                top: 0;
            }

            #inputPhone {
                width: 160px;
                padding-left: 5px;
            }

            #ageSpan {
                position: absolute;
                left: 60%;
            }

            #inputAge {
                position: absolute;
                left: 70%;
                font-size: 12pt;

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

    .doAns {
        width: 60%;
        height: 300px;
        margin: 0 auto;

        .question {
            width: 90%;
            height: auto;
            padding-left: 20px;
            border: 0.2px solid rgb(47, 124, 42, 0.2);
            box-shadow:
                0em 0em 3em rgb(0, 255, 0, 0.015);
            background: rgba(183, 196, 184, 0.5);
            border-radius: 10px;
            margin: 20px 50px;
            padding-top: 10px;

            h3 {
                font-size: 16pt;
            }

            .selInput {
                font-size: 1.5dvw;

                textarea {
                    margin-top: 5px;
                    resize: none;
                    height: 150px;
                    width: 95%;
                    padding: 5px;
                    font-size: 1.5dvw;
                    overflow-y: scroll;

                    &:hover {
                        outline: none;
                    }
                }
            }

            input[type=radio] {
                height: 20px;
                width: 20px;
                margin-right: 20px;
                font-size: 1.5dvw;
            }

            input[type=checkbox] {
                height: 20px;
                width: 20px;
                margin-right: 20px;
                font-size: 1.5dvw;
            }
        }
    }

    .ansDone {
        position: fixed;
        bottom: 2%;
        right: 10%;
        font-size: 20pt;
        border: 0;
        background: none;
        color: rgb(113, 165, 110);
        border-radius: 5px;
        font-weight: 700;

        &:hover {
            //  圖示相關動畫
            color: rgb(255, 255, 255);
            text-shadow: 0px 0px 8px rgb(24, 98, 21),
                0px 0px 8px rgb(67, 87, 66),
                0px 0px 3px rgb(30, 62, 28),
                0px 0px 16px rgb(184, 232, 182),
                0px 0px 25px rgb(184, 226, 182),
            ;
            transition: text-shadow 0.5s;
        }

    }
}
</style>