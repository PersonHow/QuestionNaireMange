<template>
    <h1>問卷預覽</h1>
    <div class="checkTitle">
        <span class="title">{{ this.surInfo.surveyTitle }} &nbsp; &nbsp;</span>
        <span>{{ this.surInfo.surveyStartTime }} ~ {{ this.surInfo.surveyEndTime }}</span>
        <h3 class="content">問卷說明:{{ this.surInfo.surveyContent }}</h3>
    </div>
    <div class="checkSel">
        <!--每個問題與它的選項 -->
        <div class="quesAndSelcet" v-for="(item, index) in this.questions">
            <h3 v-if="item.split(',')[1] == '必填'">{{ item.split(",")[0] }} &nbsp; {{ item.split(',')[1] }}</h3>
            <h3 v-else>{{ item.split(",")[0] }}</h3>

            <div class="selInput" v-for="(elements, nums) in this.ansSelect[index].split(',')[1].split(';')">
                <textarea v-if="this.ansSelect[index].split(',')[0] == '簡答'" disabled></textarea>
                <input type="radio" name="radioAns" :value="elements" v-if="this.ansSelect[index].split(',')[0] == '單選'"
                    @change="console.log(elements)" disabled>
                <input type="checkbox" name="checkboxAns" :value="elements"
                    v-if="this.ansSelect[index].split(',')[0] == '複選'" disabled>
                <label for="">{{ elements }}</label>
            </div>
        </div>
    </div>
    <button type="button" class="checkBtn" @click="this.addEnd()">確認送出</button>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import survey from '../../stores/survey';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
        }
    },
    props: [
        "title",
        "content",
        "start",
        "end",
        "question",
        "answers",
        "named"
    ],
    computed: {
        ...mapState(survey, ["surInfo", "questions", "ansSelect"])
    },
    methods: {
        ...mapActions(survey, ["addSurveyInfo"]),
        addEnd() {
            this.addSurveyInfo()
            console.log("xxx")
            Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "成功新增問卷",
                        showConfirmButton: false,
                        timer: 1000
                    })
            setTimeout(()=>{

                location.href = `http://${location.host}/`;
            }, 1200)
        }
    },

    mounted() {
        // this.surInfo
    }
}

</script>
<style lang="scss" scoped>
template {
    position: relative;
}

h1 {
    position: absolute;
    top: 150px;
    margin: -40px 10px;
}

.checkTitle {
    width: 60%;
    height: 30vh;
    margin: 0 auto;
    margin-bottom: -20px;

    .title {
        font-size: 28pt;
        font-weight: bold;
        margin-left: 30%;
    }

    span {
        margin-left: 20%;
    }

}

.checkSel {
    width: 60%;
    height: 300px;
    margin: 0 auto;
    // overflow-y: scroll;

        .quesAndSelcet {
            width: 90%;
            height: auto;
            padding-left: 20px;
            border: 0.2px solid rgb(47, 124, 42, 0.2);
            box-shadow:
                0em 0em 3em rgb(0, 255, 0, 0.015);
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            margin: 20px 0;
            padding-top: 10px;

            h3 {
                font-size: 16pt;
            }

            .selInput {
                font-size: 16pt;

                textarea {
                    margin-top: 5px;
                    resize: none;
                    height: 100px;
                    width: 95%;
                    padding: 5px;

                    &:hover {
                        outline: none;
                    }
                }
            }

            input[type=radio] {
                height: 20px;
                width: 20px;
                margin-right: 20px;
            }

            input[type=checkbox] {
                height: 20px;
                width: 20px;
                margin-right: 20px;
            }
        }
}

.checkBtn {
    position: absolute;
    right: 100px;
    bottom: 50px;
    border: 0;
    width: 100px;
    height: 50px;
    background: none;
    color: rgb(113, 165, 110);
    border-radius: 5px;
    font-weight: 700;
    font-size: 16pt;

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
</style>    