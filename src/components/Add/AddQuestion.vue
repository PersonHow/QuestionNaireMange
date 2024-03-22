<template>
    <div class="questTitle">
        <label for="">問卷題目</label>
        <input type="text" class="titleInput" id="titleInput">
        <label for="">必填</label>
        <input type="checkbox" class="needed" id="needed">
        <label for="">題型</label>
        <select name="" id="type" class="type" v-model="this.typeVal">
            <option value="">請選擇</option>
            <option v-for="item in typeArr" :value="item">{{ item }}</option>
        </select>
    </div>
    <div class="questOption">
        <label>選項</label>
        <div class="inputArea">
            <span>(&nbsp;多個答案請以 ; 分隔。ex:one;two;three;&nbsp; 代表第一個答案是 one 以此類推&nbsp;)</span>
            <textarea name="" id="optionAns" cols="30" rows="10" :disabled="this.typeVal == '簡答'" value=""
                v-model="this.optionAns"></textarea>
        </div>
        <button type="button" @click="this.joinOptionsAndQuestion()" v-show="this.btnType == false">JOIN</button>
        <button type="button" @click="this.editDone()" v-show="this.btnType == true">Edit</button>
    </div>
    <!-- 放新增後的問題 -->
    <table class="optionTable">
        <thead>
            <tr class="tabelTr">
                <td class="tableCheck">&nbsp;</td>
                <td class="tableNum">編號</td>
                <td class='tableTitle'>內容</td>
                <td class="tableType">題型</td>
                <td class="tableNeeded">必填</td>
                <td class="tableEdit">編輯</td>
            </tr>
        </thead>

        <tbody>
            <tr class="tabelTr" v-for="(item, index) in this.tableData">
                <td class="tableCheck"><input type="checkbox" name="index" v-model="this.deleteIndex" :value=index
                        :id=index></td>
                <td class="tableNum">{{ index + 1 }}</td>
                <td class='tableTitle'>{{ item.que.split(",")[0] }}</td>
                <td class="tableType">{{ item.ans.split(",")[0] }}</td>
                <td class="tableNeeded">{{ item.que.split(",")[1] }}</td>
                <td class="tableEdit" @click="this.editOptionAndQuestion(index)"><span>編輯</span></td>
            </tr>
        </tbody>
    </table>
    <i class="fa-regular fa-trash-can" v-show="this.trashType == false" @mousemove="this.trashType = !this.trashType"></i>
    <i class="fa-solid fa-trash-can" v-show="this.trashType == true" @mouseleave="this.trashType = !this.trashType"
        @click="this.deleteItem()"></i>
    <Modal v-if="this.modalOn" @alertMessage="this.alertOn()">
        <h1 v-show="this.typeVal == ''">尚未選擇題型</h1>
        <h1 v-show="this.optionAns == ''">選項內容不可為空</h1>
    </Modal>
</template>
<script>
import Modal from '../SurveyModal.vue'
import { mapState } from 'pinia'
import survey from '../../stores/survey'
export default {
    data() {
        return {
            // 題型的選項
            typeArr: [
                "簡答",
                "單選",
                "複選"
            ],
            // 以新增的問題&選項
            tableData: [],
            // 選擇題型的值
            typeVal: "",
            // "Join" & "Edit" 字樣切換
            btnType: false,
            // 問題位於 tableData 的索引位置
            quesIndex: "",
            // 
            deleteIndex: [],
            // 垃圾桶圖示轉變
            trashType: false,
            // modal 是否打開
            modalOn: false,
            // 選項內容的值
            optionAns: "",

        }
    },
    emits: [
        "questions",
        "answers"
    ],
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
            }

            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");
            console.log(needed.checked)
            // 問題組成字串, ex:第一問題,必填
            if (needed.checked) {
                qAndA.que = `${title.value},必填`
            } else {
                qAndA.que = `${title.value},非必填`
            }

            // 防呆, 問題回答類型沒有填 & 單複選時沒有設計選項
            if (this.typeVal == "") {
                this.modalOn = !this.modalOn
                return
            }
            if (this.typeVal !== '簡答') {
                if (this.optionAns == '') {
                    this.modalOn = !this.modalOn
                    this.textOn = !this.textOn
                    return
                }
            }

            // 選項組成字串, ex:單選題,aa;bb;cc
            qAndA.ans = `${this.typeVal},${this.optionAns}`
            this.tableData.push(qAndA)
            // 新增完成, 需要將欄位資訊清空
            title.value = ""
            needed.checked = false
            this.optionAns = ""
            this.typeVal = ""

            // 存放題目字串的陣列
            let surQArr = []
            // 存放答案字串的陣列
            let surAArr = []
            this.tableData.forEach(item => {
                surQArr.push(item.que)
                surAArr.push(item.ans)
            })
            // 每題題目與選項都已 "|" 區分
            let surQues = surQArr.join("|");
            let surAns = surAArr.join("|");
            console.log(surQues)
            this.$emit('update:questions', surQues)
            this.$emit('update:answers', surAns)
        },
        editOptionAndQuestion(index) {
            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");

            // 以下是把該選項資訊帶到輸入欄位中
            title.value = this.tableData[index].que.split(",")[0]
            if (this.tableData[index].que.split(",")[1] == "必填") {
                needed.checked = true;
            } else {
                needed.checked = false;
            }
            this.typeVal = this.tableData[index].ans.split(",")[0]
            this.optionAns = this.tableData[index].ans.split(",")[1]
            this.quesIndex = index;
            this.btnType = true
        },
        editDone() {
            // 捕捉到問題名稱與是否必填的標籤
            const title = document.querySelector("#titleInput");
            const needed = document.querySelector("#needed");

            // 防呆, 問題回答類型沒有填 & 單複選時沒有設計選項
            if (this.typeVal == "") {
                this.modalOn = !this.modalOn
                return
            }
            if (this.typeVal !== '簡答') {
                if (this.optionAns == '') {
                    this.modalOn = !this.modalOn
                    this.textOn = !this.textOn
                    return
                }
            } else {
                this.optionAns = ''
            }
            // 判定題型是否必填
            if (needed.checked) {
                this.tableData[this.quesIndex].que = `${title.value},必填`
            } else {
                this.tableData[this.quesIndex].que = `${title.value},非必填`
            }
            this.tableData[this.quesIndex].ans = `${this.typeVal},${this.optionAns}`

            // 存放題目字串的陣
            let surQArr = []
            // 存放答案字串的陣列
            let surAArr = []
            this.tableData.forEach(item => {
                surQArr.push(item.que)
                surAArr.push(item.ans)
            })
            // 每題題目與選項都已 "|" 區分
            let surQues = surQArr.join("|");
            let surAns = surAArr.join("|");
            console.log(surQues)
            this.$emit('update:questions', surQues)
            this.$emit('update:answers', surAns)
            // 新增完成, 需要將欄位資訊清空
            title.value = ""
            needed.checked = false
            this.optionAns = ""
            this.typeVal = ""

            this.btnType = !this.btnType;

        },
        alertOn() {
            this.modalOn = !this.modalOn
            this.textOn = !this.textOn
        },
        deleteItem() {
            this.deleteIndex.forEach((item, index) => {
                this.tableData.splice(item, 1)

            })
            console.log(this.tableData)
        },
    },
    computed: {
        ...mapState(survey, ["surInfo"])
    },
    components: {
        Modal
    },
    mounted() {
        // 從預覽頁返回時, 將已放入的問題抓出來顯示
        if (this.surInfo !== "") {
            this.surInfo.surveyQuestions.split('|').forEach((item, index) => {
                let qAndA = {
                    que: "",
                    ans: ""
                }
                qAndA.que = item
                qAndA.ans = this.surInfo.surveyAnswers.split('|')[index]
                this.tableData.push(qAndA)
            })
        }
    },
    updated() {

    }
}
</script>
<style lang="scss" scoped>
.fa-trash-can {
    cursor: pointer;
    position: fixed;
    right: 2%;
    bottom: 10%;
    font-size: 80px;
    color: rgb(30, 62, 28);

    &:active {
        scale: 0.9;
    }
}

.questTitle {
    width: 100%;
    height: 15%;
    font-size: 20pt;
    display: flex;
    align-items: center;
    padding: 0 10%;
    font-weight: 700;
    margin-top: -60px;
    margin-bottom: -40px;
    z-index: 1;

    input {
        width: 60%;
        height: 35px;
        margin: 0 10px;
        padding: 0px 2px;
    }

    input[type=checkbox] {
        width: 30px;
        height: 30px;
        padding: 0;

    }

    select {
        width: 80px;
        margin-left: 10px;
    }
}

.questOption {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    font-size: 20pt;
    padding: 0 10%;
    position: relative;
    font-weight: 700;
    margin-top: -40px;
    margin-bottom: -60px;

    label {
        position: absolute;
        top: 0;
    }

    .inputArea {
        display: flex;
        flex-direction: column;
        width: 60%;
        height: 150px;
        margin-left: 9%;
        position: absolute;
        top: 0;

        span {
            font-size: 16pt;
        }

        textarea {
            margin-top: 10px;
            font-size: 14pt;
            padding-left: 10px;
            resize: none;
            height: 100px;
            width: 100%;
        }
    }

    button {
        position: absolute;
        bottom: 50px;
        right: 12%;
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

.optionTable {
    padding: 0 10%;
    width: 100%;
    height: 40%;

    .tabelTr {
        width: 100%;
        height: 20%;
        display: table;
        font-size: 14pt;
        font-weight: 600;

        .tableCheck {
            width: 4%;
        }

        .tableNum {
            width: 8%;
        }

        .tableTitle {
            width: 44%;
        }

        .tableType {
            width: 10%;
        }

        .tableNeeded {
            width: 10%;
        }

        .tableEdit {
            width: 10%;
            cursor: pointer;
            // span {

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


            &:active {
                color: rgb(7, 86, 20);
                text-shadow:
                    0px 0px 2px rgb(184, 232, 182),
                    0px 0px 16px rgb(184, 232, 182),
                    0px 0px 25px rgb(184, 226, 182),
                    0px 0px 35px rgb(73, 205, 66),
                    0px 0px 50px rgb(7, 80, 4),
                ;
                transition: text-shadow 0.2s;
                scale: 0.95;
            }

            // }
        }
    }

    thead {
        background: rgb(113, 165, 110);
        height: 10%;
        width: 100%;
        display: table;
        border-bottom: 5px solid rgb(30, 62, 28);

        tr {
            height: 100%;

            td {
                height: 100%;
                font-size: 16pt;
                color: white;
                font-weight: 700;
                text-align: center;
                padding-right: 26px;
            }


        }
    }


    tbody {
        height: 90%;
        width: 100%;
        display: block;
        overflow-y: scroll;

        tr {
            height: 10%;
            border-bottom: 3px solid rgb(24, 98, 21);

            td {
                height: 100%;
                text-align: center;

                input {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}
</style>