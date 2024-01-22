<template>
    <div class="resArea" v-if="this.changePage == false">
        <div class="resBlock" v-for="(item, index) in this.replyArr" @click="this.getNum(item)">
            <span>回應編號：{{ index + 1 }}</span>
            <span>姓名:{{ item.personalId }}</span>
            <span>填寫時間：{{ item.surveyResTime }}</span>
        </div>
    </div>
    <div class="checkInfo" v-if="this.changePage == true">
        <ResCheck @backRes="this.backHome()" ></ResCheck>
    </div>
</template>
<script>
import ResCheck from './ResCheck.vue'
export default {
    data() {
        return {
            replyArr: [],
            changePage: false,
            objSurvey:{},
        }
    },
    methods: {
        backHome() {
            this.changePage = false;
        },
        getNum(item) {
            console.log(item)
            this.objSurvey = item
            this.changePage = !this.changePage
        },
        showRePlys() {
            fetch("http://localhost:8080/questionNaire/getSurveyReplys", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    surveyId: this.surveyId
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.replyArr = data.replyList;
                    this.replyArr = this.replyArr.reverse()
                })
                .catch(error => console.log(error))
        }
    },
    props: [
        'surveyId'
    ],
    components: {
        ResCheck
    },
    mounted() {
        this.showRePlys()

    }
}
</script>
<style lang="scss" scoped>
.resArea {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-auto-rows: 30%;
    justify-content: space-around;
    align-items: center;
    overflow-y: scroll;

    .resBlock {
        width: 95%;
        height: 90%;
        border: 0.5px solid rgb(0, 0, 0, 0.4);
        border-radius: 5px;
        color: rgb(75, 112, 73);
        box-shadow:
            0px 0px 8px rgb(0, 0, 0, 0.2),
            0px 0px 16px rgb(0, 0, 0, 0.1), ;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s linear;
        cursor: pointer;
        font-size: 1dvw;

        &:hover {
            font-size: 1.04dvw;
            box-shadow:
                inset 0px 0px 2em rgb(85, 255, 0, 0.5),
                0px 0px 30px rgb(25, 255, 15, 0.45);
            border: 3px solid rgb(11, 177, 11);

        }
    }
}

.checkInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow-y: scroll;
    position: relative;
}
</style>