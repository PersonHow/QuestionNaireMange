import { defineStore } from 'pinia'

export default defineStore('survey', {
    state() {
        return {
            surInfo: ""
        }
    },
    getters: {
        questions() {
            return this.surInfo.surveyQuestions.split('|');

        },
        ansSelect() {
            return this.surInfo.surveyAnswers.split('|');
        }
    },
    actions: {
        getInfo(info) {
            this.surInfo = info;
        },
        addSurveyInfo() {
            console.log(this.surInfo)
            let data = {
                surveyInfo: {

                }
            }
            data.surveyInfo = this.surInfo;

            fetch("http://localhost:8080/questionNaire/addSurveyInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => console.log(error))
            this.surInfo = ""
        }
    }
})