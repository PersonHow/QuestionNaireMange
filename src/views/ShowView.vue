<template>
    <div class="addSurArea">

        <div class="navBar">
            <h1 style="cursor: default;">SerialNum：{{ this.$route.params.id }}</h1>
            <h1 :class="{ 'lightText': this.location == 1 }" @click="this.change(1)">SurveyTitle</h1>
            <h1 :class="{ 'lightText': this.location == 2 }" @click="this.change(2)">SurveyQuestion</h1>
            <h1 :class="{ 'lightText': this.location == 3 }" @click="this.change(3)"
                v-if="this.surveyInfo.surveyCondition !== '尚未開始'">SurveyResponse</h1>
            <button v-if="this.surveyInfo.surveyCondition == '尚未開始'" @click="this.editSurvey()">Edit&nbsp;Done</button>
            <!-- <button v-else @click="this.editSurvey()">Edit&nbsp;Done</button> -->
            <h1 v-else :class="{ 'lightText': this.location == 4 }" @click="this.goTotal(this.surveyInfo.surveyId)" >SurveyTotal</h1>

        </div>
        <div class="hr"></div>
        <div class="contentShow">
            <ShowTitle v-if="this.location == 1" v-model:title="this.surveyInfo.surveyTitle"
                v-model:content="this.surveyInfo.surveyContent" v-model:startTime="this.surveyInfo.surveyStartTime"
                v-model:endTime="this.surveyInfo.surveyEndTime" @checkNamed="giveCheck" :location="this.location"
                :surveyCondition="this.surveyInfo.surveyCondition" />

            <ShowQuestion v-if="this.location == 2" v-model:questions="this.surveyInfo.surveyQuestions"
                v-model:answers="this.surveyInfo.surveyAnswers"
                :surveyCondition="this.surveyInfo.surveyCondition" />
            <ShowRes v-if="this.location == 3" :surveyId="this.surveyInfo.surveyId"
                :surveyNamed="this.surveyInfo.surveyNamed" :answers="this.surveyInfo.surveyAnswers" />
            <!-- <ShowTotal v-if="this.location == 4" :id="this.surveyInfo.surveyId"/> -->
        </div>
    </div>
</template>
<script>
import ShowTitle from '../components/Show/ShowTitle.vue';
import ShowQuestion from '../components/Show/ShowQuestion.vue'
import ShowRes from '../components/Show/ShowRes.vue';
// import ShowTotal from '../components/Show/ShowTotal.vue';
import { computed } from 'vue'
export default {
    data() {
        return {
            location: 1,
            surveyInfo: {
            },
            openRed: false,

        }
    },
    components: {
        ShowTitle,
        ShowQuestion,
        ShowRes,
        // ShowTotal
    },
    watch: {
    },
    provide() {
        return {
            survey: computed(() => this.surveyInfo),
        }
    },
    methods: {
        change(x) {
            this.location = x
        },
        giveCheck(x) {
            this.surveyInfo.surveyNamed = x
            console.log(this.surveyInfo)
        },
        showSurvey() {
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
                    this.surveyInfo = data;
                })
                .catch(error => console.log(error))
        },
        editSurvey(){
            console.log(this.surveyInfo)
            fetch("http://localhost:8080/questionNaire/editSurveyInfo",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(this.surveyInfo)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
            })
            .catch(err => console.log(err))
        },
        goTotal(id){
            this.$router.push(`/Total/${id}`)
        }
    },
    mounted() {

    },
    created() {
        this.showSurvey();
    },
    updated() {
        console.log(this.surveyInfo)
    }

}
</script>
<style lang="scss" scoped>
.addSurArea {
    width: 100%;
    height: 100%;
    display: flex;
    box-shadow: 0px 2px 2px 0 rgba(163, 163, 162, 0.5) inset;

    .navBar {
        width: 20%;
        height: 620px;
        margin-top: -10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            width: 100%;
            text-align: center;
            transition: all 0.4s linear;
            margin-top: 4dvh;
            margin-bottom: 4dvh;
            cursor: pointer;
            font-size: 2dvw;

            &:hover {
                scale: 1.05;
                transition: all 0.1s linear;
            }
        }

        button {
            width: 100%;
            background: none;
            text-align: center;
            margin-top: 18dvh;
            margin-bottom: 2dvh;
            cursor: pointer;
            font-size: 3.5dvw;
            border: none;
            font-weight: 700;
            transition: all 0.1s linear;
            color: rgb(54, 117, 43);

            &:hover {
                color: rgb(158, 240, 149);
                text-shadow:
                    10px 17px 3px rgb(54, 117, 43),
                ;
            }

            &:active {
                color: rgb(54, 117, 43);
                text-shadow: none;
            }
        }

        .lightText {
            color: rgb(232, 251, 240);
            -webkit-text-stroke: rgb(0, 157, 0);
            height: 15%;
            text-shadow:
                0px 0px 35px rgb(174, 237, 163),
                0px 0px 8px rgb(19, 127, 0),
                5px 0px 35px rgb(174, 237, 163),
                -5px 0px 35px rgb(174, 237, 163),
                0px 10px 20px rgb(135, 190, 125),
                -10px 0px 20px rgb(135, 190, 125),
                0px -10px 20px rgb(135, 190, 125),
            ;
            cursor: pointer;
            padding-top: 25px;
            margin-top: 4dvh;
            transition: all 0.5s;
            border: none;
            animation: lightingText linear infinite 4000ms;

            &:hover {
                scale: 1;
                border: none;

            }
        }


    }

    @keyframes lightingText {
        0% {
            text-shadow:
                0px 0px 35px rgb(174, 237, 163),
                0px 0px 8px rgb(19, 127, 0),
                5px 0px 35px rgb(174, 237, 163),
                -5px 0px 35px rgb(174, 237, 163),
                0px 10px 20px rgb(135, 190, 125),
                -10px 0px 20px rgb(135, 190, 125),
                0px -10px 20px rgb(135, 190, 125),
            ;
        }

        50% {
            text-shadow:
                0px 0px 4px rgb(19, 127, 0),
                0px 0px 20px rgb(135, 190, 125),
                0px 20px 20px rgb(135, 190, 125),
                20px 0px 20px rgb(135, 190, 125),
                -20px 0px 20px rgb(135, 190, 125),
                0px -20px 20px rgb(135, 190, 125),
            ;
        }

        100% {
            text-shadow:
                0px 0px 35px rgb(174, 237, 163),
                0px 0px 8px rgb(19, 127, 0),
                5px 0px 35px rgb(174, 237, 163),
                -5px 0px 35px rgb(174, 237, 163),
                0px 10px 20px rgb(135, 190, 125),
                -10px 0px 20px rgb(135, 190, 125),
                0px -10px 20px rgb(135, 190, 125),
            ;
        }


    }

    .hr {
        width: 1px;
        height: 90%;
        margin-top: 20px;
        margin-right: 5px;
        background: rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .contentShow {
        padding-top: 10px;
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        transition: all 3s;
        z-index: 0;
    }
}
</style>