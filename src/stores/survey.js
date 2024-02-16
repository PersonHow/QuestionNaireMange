import { defineStore } from 'pinia'

export default defineStore('survey', {
    state() {
        return {
            surInfo: "",
            searchObject: {
                title: "",
                startTime: "",
                endTime: ""
            },
            searchResult: ""
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
        },
        setSearchValue(title, start, end) {
            if (title !== "" || title !== undefined) {
                this.searchObject.title = title;
            }
            if (start !== "" || start !== undefined) {
                this.searchObject.startTime = start;
            }
            if (end !== "" || end !== undefined) {
                this.searchObject.endTime = end;
            }
            console.log(this.searchObject)
        },
        searchSurveyInfo() {
            fetch("http://localhost:8080/questionNaire/searchSurveyInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.searchObject)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (this.searchObject.startTime == "" && this.searchObject.title == "" && this.searchObject.endTime == "") {
                        this.searchResult == "";
                        
                    } else {
                        this.searchResult = data;
                    }
                    console.log(this.searchResult)
                })
                .catch(err => console.log(err))
        }
    }
})