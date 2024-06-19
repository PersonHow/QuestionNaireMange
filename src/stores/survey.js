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
            if (!title) {
                title = "";
            }
            if (!start) {
                start = "";
            }
            if (!end) {
                end = "";
            }
            this.searchObject.title = title
            this.searchObject.startTime = start
            this.searchObject.endTime = end
            console.log(this.searchObject)
            this.searchSurveyInfo(title, start, end)
        },
        searchSurveyInfo(title, start, end) {
            fetch("http://localhost:8080/questionNaire/searchSurveyInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.searchObject)
            })
                .then(res => res.json())
                .then(data => {
                    if (!start  && !title  && !end) {
                        this.searchResult = "";
                        
                    } else {
                        this.searchResult = data;
                    }
                    console.log("searchResult"+this.searchResult)
                    console.log(`${title}${start}${end}`);
                    console.log("searchResult"+typeof(this.searchResult))
                })
                .catch(err => console.log(err))
        }
    }
})