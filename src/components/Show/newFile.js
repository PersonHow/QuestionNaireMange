/* __placeholder__ */
export default (await import('vue')).defineComponent({
    data() {
        return {
            typeArr: [
                "簡答",
                "單選",
                "複選"
            ],
            tableData: [],
            typeVal: "",
            btnType: false,
            quesIndex: "",
            deleteIndex: [],
            trashType: false,
        };
    },
    props: [
        "questions",
        "answers"
    ],
    methods: {
        joinOptionsAndQuestion() {
            // 建立一個空間存放每組問題與它的選項們
            let qAndA = {
                que: "",
                ans: ""
            };

            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");
            console.log(needed.checked);
            // 問題組成字串, ex:第一問題,必填
            if (needed.checked) {
                qAndA.que = `${title.value},必填`;
            } else {
                qAndA.que = `${title.value},非必填`;
            }

            // 防呆, 問題回答類型沒有填 & 單複選時沒有設計選項
            if (this.typeVal == "") {
                this.modalOn = !this.modalOn;
                return;
            }
            if (this.typeVal !== '簡答') {
                if (this.optionAns == '') {
                    this.modalOn = !this.modalOn;
                    this.textOn = !this.textOn;
                    return;
                }
            }

            // 選項組成字串, ex:單選題,aa;bb;cc
            qAndA.ans = `${this.typeVal},${this.optionAns}`;
            this.tableData.push(qAndA);
            // 新增完成, 需要將欄位資訊清空
            title.value = "";
            needed.checked = false;
            this.optionAns = "";
            this.typeVal = "";

            // 存放題目字串的陣列
            let surQArr = [];
            // 存放答案字串的陣列
            let surAArr = [];
            this.tableData.forEach(item => {
                surQArr.push(item.que);
                surAArr.push(item.ans);
            });
            // 每題題目與選項都已 "|" 區分
            let surQues = surQArr.join("|");
            let surAns = surAArr.join("|");
            console.log(surQues);
            this.$emit('update:questions', surQues);
            this.$emit('update:answers', surAns);
        },
        editOptionAndQuestion(index) {
            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");

            // 以下是把該選項資訊帶到輸入欄位中
            title.value = this.tableData[index].que.split(",")[0];
            if (this.tableData[index].que.split(",")[1] == "必填") {
                needed.checked = true;
            } else {
                needed.checked = false;
            }
            this.typeVal = this.tableData[index].ans.split(",")[0];
            this.optionAns = this.tableData[index].ans.split(",")[1];
            this.quesIndex = index;
            this.btnType = !this.btnType;
        },
        editDone() {
            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");

            // 防呆, 問題回答類型沒有填 & 單複選時沒有設計選項
            if (this.typeVal == "") {
                this.modalOn = !this.modalOn;
                return;
            }
            if (this.typeVal !== '簡答') {
                if (this.optionAns == '') {
                    this.modalOn = !this.modalOn;
                    this.textOn = !this.textOn;
                    return;
                }
            } else {
                this.optionAns = '';
            }
            // 判定題型是否必填
            if (needed.checked) {
                this.tableData[this.quesIndex].que = `${title.value},必填`;
            } else {
                this.tableData[this.quesIndex].que = `${title.value},非必填`;
            }
            this.tableData[this.quesIndex].ans = `${this.typeVal},${this.optionAns}`;

            // 存放題目字串的陣
            let surQArr = [];
            // 存放答案字串的陣列
            let surAArr = [];
            this.tableData.forEach(item => {
                surQArr.push(item.que);
                surAArr.push(item.ans);
            });
            // 每題題目與選項都已 "|" 區分
            let surQues = surQArr.join("|");
            let surAns = surAArr.join("|");
            console.log(surQues);
            this.$emit('update:questions', surQues);
            this.$emit('update:answers', surAns);
            // 新增完成, 需要將欄位資訊清空
            title.value = "";
            needed.checked = false;
            this.optionAns = "";
            this.typeVal = "";
            this.btnType = !this.btnType;

        },
        alertOn() {
            this.modalOn = !this.modalOn;
            this.textOn = !this.textOn;
        },
        deleteItem() {
            this.deleteIndex.forEach((item, index) => {
                this.tableData.splice(item, 1);

            });
            console.log(this.tableData);
        },
        creatData() {
            console.log(this.questions);
            console.log(this.answers);
            let quzArr = this.questions.split("|");
            // this.ans
            quzArr.forEach((item, index) => {
                let qAndA = {
                    que: "",
                    ans: ""
                };
                qAndA.que = item;
                qAndA.ans = this.answers.split("|")[index];
                this.tableData.push(qAndA);
            });


        }
    },
    mounted() {
    },
    created() {
        this.tableData.que = this.questions;
        this.tableData.ans = this.answers;
        console.log(this.tableData);
        this.creatData();
    },
    updated() {
        console.log(this.deleteIndex);
    }
});
