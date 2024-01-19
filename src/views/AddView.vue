<template>
    <div class="addSurArea">

        <div class="navBar">
            <h1 :class="{ 'lightText': this.location == 1 }" @click="this.setLocation(1)">
                SurveyTitle</h1>
            <h1 :class="{ 'lightText': this.location == 2 }" @click="this.setLocation(2)">SurveyQuestion</h1>
            <h1 :class="{ 'lightText': this.location == 3 }" v-if="this.surveyInfo.surveyQuestions !== ''"
                @click="this.setLocation(3), this.getInfo(this.surveyInfo)">
                SurveyCheck</h1>
            <h1 class="dark" v-if="this.surveyInfo.surveyQuestions == ''">SurveyCheck</h1>
        </div>
        <div class="hr"></div>
        <div class="contentShow">
            <AddTitle v-if="this.location == 1" v-model:title="this.surveyInfo.surveyTitle"
                v-model:content="this.surveyInfo.surveyContent" v-model:startTime="this.surveyInfo.surveyStartTime"
                v-model:endTime="this.surveyInfo.surveyEndTime" @checkNamed="giveCheck" :location="this.location" />

            <AddQuestion v-if="this.location == 2" v-model:questions="this.surveyInfo.surveyQuestions"
                v-model:answers="this.surveyInfo.surveyAnswers" />
            <AddCheck v-if="this.location == 3" :title="this.surveyInfo.surveyTitle" :content="this.surveyInfo.surveyContent"
            :start="this.surveyInfo.surveyStartTime" :end="this.surveyInfo.surveyEndTime" :questions="this.surveyInfo.surveyQuestions"
            :answers="this.surveyInfo.surveyAnswers" :named="this.surveyInfo.surveyNamed"/>
        </div>
    </div>
</template>
<script>
import AddTitle from '../components/Add/AddTitle.vue';
import AddQuestion from '../components/Add/AddQuestion.vue'
import AddCheck from '../components/Add/AddCheck.vue';
import { mapState, mapActions } from 'pinia';
import survey from '../stores/survey';
import location from '../stores/location'
export default {
    data() {
        return {
            surveyInfo: {
                surveyTitle: "",
                surveyContent: "",
                surveyStartTime: "",
                surveyEndTime: "",
                surveyQuestions: "",
                surveyAnswers: "",
                surveyNamed: false
            },
            openRed: false,

        }
    },
    components: {
        AddTitle,
        AddQuestion,
        AddCheck
    },
    computed: {
        ...mapState(location, ["location"])
    },
    methods: {
        ...mapActions(survey, ["getInfo"]),
        ...mapActions(location, ["setLocation"]),
        // 是否記名
        giveCheck(x) {
            this.surveyInfo.surveyNamed = x
            console.log(this.surveyInfo)
        }
    },
    mounted() {

    },
    updated() {
        if(this.surveyInfo.surveyEndTime !== ''){
            console.log(this.surveyInfo)
        }
    }

}
</script>
<style lang="scss" scoped>
.addSurArea {
    width: 100%;
    height: 100%;
    display: flex;

    .navBar {
        width: 20%;
        height: 620px;
        margin-top: -10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        h1 {
            width: 100%;
            height: 15%;
            text-align: center;
            padding-top: 25px;
            cursor: pointer;
            transition: all 0.4s;
        }

        .lightText {
            color: rgb(232, 251, 240);
            -webkit-text-stroke: rgb(0, 157, 0);
            text-shadow:
                0px 0px 35px rgb(174, 237, 163),
                0px 0px 8px rgb(19, 127, 0),
                5px 0px 35px rgb(174, 237, 163),
                -5px 0px 35px rgb(174, 237, 163),
                0px 5px 35px rgb(174, 237, 163),
                0px -5px 35px rgb(174, 237, 163),
                10px 0px 20px rgb(135, 190, 125),
                0px 10px 20px rgb(135, 190, 125),
                -10px 0px 20px rgb(135, 190, 125),
                0px -10px 20px rgb(135, 190, 125),
            ;
        }

        .dark {
            cursor: not-allowed;
            opacity: 0.3;
        }

    }

    .hr {
        width: 2px;
        height: 550px;
        margin-top: 20px;
        background: rgba($color: #000000, $alpha: 0.4);
    }

}

.contentShow {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transition: all 3s;
    overflow-y: scroll;
}
</style>