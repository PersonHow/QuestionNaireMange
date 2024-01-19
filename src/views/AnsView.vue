<template>
    <div class="ansArea">
        <!-- <p>{{ this.anwserRes }}</p> -->
        <WriteSurvey v-if="this.checkOff == false" :id=this.id :title="this.surveyInfo.surveyTitle"
            :content="this.surveyInfo.surveyContent" :start="this.surveyInfo.surveyStartTime"
            :end="this.surveyInfo.surveyEndTime" :quizs="this.surveyInfo.surveyQuestions"
            :selects="this.surveyInfo.surveyAnswers" :named="this.surveyInfo.surveyNamed" v-model:res="this.anwserRes"
            @nextPage="this.changePage()" v-model:reserEmail="this.reserInfo.personalId"
            v-model:reserName="this.reserInfo.personalName" v-model:reserPhone="this.reserInfo.personalPhone"
            v-model:reserAge="this.reserInfo.personalAge" />
        <ResCheck v-else :id="this.id" :title="this.surveyInfo.surveyTitle" :content="this.surveyInfo.surveyContent"
            :start="this.surveyInfo.surveyStartTime" :end="this.surveyInfo.surveyEndTime"
            :quizs="this.surveyInfo.surveyQuestions" :selects="this.surveyInfo.surveyAnswers" :res="this.anwserRes"
            :reserEmail="this.reserInfo.personalId" :reserName="this.reserInfo.personalName"
            :reserPhone="this.reserInfo.personalPhone" :reserAge="this.reserInfo.personalAge" @surveyDone="this.sentReply()"
            @backRes="this.changePage()" />
    </div>
</template>
<script>
import WriteSurvey from '../components/WriteSurvey.vue';
import ResCheck from '../components/ResCheck.vue';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            checkOff: false,
            surveyInfo: {},
            anwserRes: [],
            reserInfo: {},
        }
    },
    components: {
        WriteSurvey,
        ResCheck
    },
    methods: {
        // 改變 確認/填寫頁
        changePage() {
            this.checkOff = !this.checkOff;
        },
        // 取得問卷資料
        getInfo() {
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
        // 送出問卷答案
        sentReply() {
            let time = new Date(Date.now())
            let month = ""
            // 日期格式月份處理
            if ((time.getMonth() + 1) < 10) {
                month = "0" + (time.getMonth() + 1).toString()
            } else {
                month = time.getMonth() + 1
            }
            
            let timeStr = `${time.getFullYear()}-${month}-${time.getDate()}`;

            // 把資料整理成送往後端的請求格式
            let sentTarget = {
                reply: [
                    {
                        surveyId: this.$route.params.id,
                        personalId: this.reserInfo.personalId,
                        surveyResAns: this.anwserRes.join("|"),
                        surveyResTime: timeStr
                    }
                ]
            }
            // 確認問卷是否記名，若不記名則填訪客
            if (!this.surveyInfo.surveyNamed) {
                sentTarget.reply[0].personalId = "訪客"
            }
            console.log(sentTarget)

            // 信箱與手機正規化
            let mailMatch = /^\w+@\w+mail\.com$/;
            let phoneMatch = /^09\d{8}$/;
            if (!mailMatch.test(this.reserInfo.personalId) || !phoneMatch.test(this.reserInfo.personalPhone)) {
                Swal.fire({
                    title: 'Error!',
                    text: 'mail 或 手機格式錯誤',
                    icon: 'error',
                    confirmButtonText: 'Check'
                })
            }

            // 將問卷回饋送往後端
            fetch("http://localhost:8080/questionNaire/addSurveyReply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sentTarget)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // 確認有記名再儲存填卷者資訊
                    if (this.surveyInfo.surveyNamed) {
                        this.addPersonal(this.reserInfo)
                    }
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "成功送出問卷",
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => console.log(error))
        },
        // 記名制時紀錄填卷者資訊
        addPersonal(reser) {
            let item = {
                personal: {
                }
            }
            item.personal = reser


            fetch("http://localhost:8080/questionNaire/addPersonalInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))
        }
    },
    props: [
        "id"
    ],
    created() {
        this.getInfo()
    },
    mounted() {

    },
    updated() {

    }

}
</script>
<style lang="scss" scoped>
.ansArea {
    width: 100vw;
    height: 100%;
    display: flex;
    overflow-y: scroll;
    position: absolute;
}
</style>