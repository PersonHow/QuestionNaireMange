<script>
import { mapState, mapActions } from 'pinia';
import location from '../stores/location';
import survey from '../stores/survey';
import { RouterLink } from 'vue-router';
import modal from '../components/SurveyModal.vue';
export default {
  data() {
    return {
      // 總資料陣列
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      // 分頁
      dataPages: [],
      // 當前頁面要顯示的資料陣列
      dataArr: [],
      // 當前頁面
      currentIndex: 1,
      // 刪除資料的索引
      delArr: [],
      // 控制開關 Modal
      openModal: false,
      // Modal 中使用的物件
      modalObject: {},
      // 資料的數量
      dataNums: undefined,

    }
  },
  computed: {
    ...mapState(survey, ['searchResult'])
  },
  methods: {
    ...mapActions(location, ["setLocation"]),
    showAll() {
      fetch("http://localhost:8080/questionNaire/backAllSurvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: 0
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data !== '') {

            this.arr = data;
          }
          this.pagination(this.arr, 1)
        })
        .catch(error => console.log(error)
        )
    },
    pagination(data, nowPage) {
      // 全部資料的長度
      const dataTotal = data.length;
      // 每頁要顯示的資料筆數
      const pageData = 6;

      // page 按鈕總數量公式  = 總資料數量 / 每頁顯示的資料筆數
      // 為避免出現餘數, 使用無條件進位
      this.dataPages = [];
      const pageTotal = Math.ceil(dataTotal / pageData);
      for (let i = 1; i <= pageTotal; i++) {
        this.dataPages.push(i)
      }
      console.log(this.dataPages)
      console.log(`全部資料:${dataTotal} 每一頁顯示:${pageData}筆 總頁數:${pageTotal}`)

      // 當前頁數, 從第一頁開始
      let currentPage = nowPage;

      // 為避免當前頁數超出總頁數
      if (currentPage > pageTotal) {
        currentPage = pageTotal;
      }

      // 切換頁數時, 顯示資料也要更動, 第一頁要顯示第一筆 ~ 第五筆, 以此類推
      // 公式 =  (當前頁數 * 每頁顯示的資料) - 每頁顯示的資料 +1;
      // minData = 每個分頁的第一筆
      const minData = (currentPage * pageData) - pageData;
      // maxData = 每個分頁的最後一筆
      const maxData = (currentPage * pageData);

      // 針對總資料筆數進行篩選, 要顯示在畫面上的資料 
      this.dataArr = data.slice(minData, maxData)
      this.dataNums = data.length
    },
    changePages(nowPage) {
      if (this.searchResult !== '') {
        this.pagination(this.searchResult.surveyLists, nowPage)

      } else {
        this.pagination(this.arr, nowPage)
      }
      this.currentIndex = nowPage
    },
    showSurvey(id) {
      this.$router.push(`/ShowView/${id}`)
    },
    controlModal(target) {
      this.modalObject = target;
      this.openModal = !this.openModal;
    },
    showSurveyTotal(id){
      this.$router.push(`/Total/${id}`)
    }

  },
  components: {
    RouterLink,
    modal,
  },
  props: [
    'show'
  ],
  mounted() {
    this.setLocation(1)
  },
  created() {
    this.showAll()
    if (this.searchResult !== '') {
      this.pagination(this.searchResult.surveyLists, 1)
    }
    // 當搜尋結果的 surveyLists 屬性不等於 undefined 時
    // 藉由比對資料量來控制顯示結果，這樣就不會跑版
    setInterval(() => {
      if (this.searchResult.surveyLists !== undefined) {
        if (this.dataNums !== this.searchResult.surveyLists.length) {
          this.changePages(this.currentIndex)
        }
      }
    }, 200)

    console.dir(window)
  },
  updated() {

  }

}
</script>

<template>
  <div class="questionArea">
    <div class="question" v-for="(item, index) in dataArr">
      <input type="checkbox" :class="{ 'showInput': this.show === true }">
      <div class="surveyBlock" @click="this.controlModal(item)">
        <span class="surveyTitle">SurveyNum:{{ item.surveyId }}</span>
        <span class="surveyText">問卷標題:{{ item.surveyTitle }}</span>
        <span class="surveyText" :class="{ 'redText': item.surveyCondition == '開放中' }">狀態:{{
          item.surveyCondition }}</span>
        <span class="surveyText">時間:{{ item.surveyStartTime }}&nbsp;~&nbsp;{{ item.surveyEndTime }}</span>
      </div>
    </div>
    <modal v-if="this.openModal" @closeModal="this.controlModal()" @startWrite="showSurvey(this.modalObject.surveyId)"
      @startTotal="showSurveyTotal(this.modalObject.surveyId)" :surveyCondition="this.modalObject.surveyCondition">
      <template v-slot:surveyId>
        <h2>SurveyNum&nbsp;:&nbsp;{{ this.modalObject.surveyId }}</h2>
      </template>
      <template v-slot:time>
        <h2>時間&nbsp;:&nbsp;{{ this.modalObject.surveyStartTime }}&nbsp;~&nbsp;{{ this.modalObject.surveyEndTime }}</h2>
      </template>
      <template v-slot:condition>
        <span class="contentCondition">狀態&nbsp;:</span>
        <span class="contentCondition" :class="{ 'redText': this.modalObject.surveyCondition == '開放中' }">
          {{ this.modalObject.surveyCondition }}
        </span>
      </template>
      <template v-slot:title>
        <h2>問卷標題&nbsp;:&nbsp;{{ this.modalObject.surveyTitle }}</h2>
      </template>
      <template v-slot:content>
        <h2>內容&nbsp;:</h2>
        <div class="contentTextArea">
          {{ this.modalObject.surveyContent }}
        </div>
      </template>

    </modal>
    <div class="btnArea">
      <button type="button" v-for="item in this.dataPages" @click="this.changePages(item)" class="pageBTN"
        :class="{ 'lightBTN': this.currentIndex === item }">{{ item }}</button>
    </div>


  </div>
</template>

<style scoped lang="scss">
$bg: rgb(255, 255, 255);

.questionArea {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  padding-top: 30px;
  box-shadow: 0px 2px 2px 0 rgba(163, 163, 162, 0.5) inset;
  transition: all 0.2s linear;
  position: relative;
  

  .question {
    width: 30%;
    height: 40%;
    display: flex;
    margin: 0 20px;


    input {
      width: 1dvw;
      height: 2dvh;
      scale: 0;
      opacity: 0;
      transition: all 1s;
    }

    .showInput {
      width: 1dvw;
      height: 2dvh;
      margin: 1dvh 1dvw;
      opacity: 1;
      scale: 2;
      transition: all 1s;
    }

    .surveyBlock {
      width: 100%;
      height: 95%;
      background: $bg;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      border: 0.5px solid rgb(47, 124, 42);
      color: rgb(75, 112, 73);
      background: rgba(255, 255, 255, 0.08);
      font-family: 'Noto Sans TC', sans-serif;
      cursor: pointer;
      transition: all linear 0.5s;
      transition: border linear 0.2s;

      .surveyTitle {
        font-size: 2.5dvw;
        transition: all linear 0.1s;
      }

      &:hover {
        box-shadow:
          inset 0px 0px 2em rgb(85, 255, 0, 0.5),
          0px 0px 30px rgb(25, 255, 15, 0.45);
        border: 3px solid rgb(11, 177, 11);
        color: rgb(113, 156, 111);

        .surveyTitle {
          font-size: 3dvw;
        }

        .surveyText {
          font-size: 1dvw;
        }
      }
    }
  }

  .btnArea {
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    .pageBTN {
      font-size: 30px;
      margin: 0 5px;
      background: none;
      border: none;
      transition: color 0.3s, font-size 0.1s;

      &:hover {
        color: rgba(42, 194, 4, 0.8);
        transition: color 0.3s;
        scale: 1.1;
      }
    }

    .lightBTN {
      color: rgb(113, 165, 110);
      font-size: 38px;
      transition: color 0.3s, font-size 0.1s;
    }
  }

  .contentTextArea {
    resize: none;
    width: 90%;
    height: 100%;
    font-size: 24px;
    margin-top: 1dvh;
    margin-left: 5%;
    font-weight: 700;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      outline: none;
    }
  }

  .contentCondition {
    font-weight: 700;
  }

  .redText {
    color: red;
  }
}

@media screen and (max-width:1200px) {
    .questionArea{
      height: 140%;
      position: relative;

      .question{
        height: 25%;
      }

      .btnArea{
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>