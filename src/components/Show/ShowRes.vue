<template>
    <div class="resArea" v-if="this.changePage == false">
        <div class="resBlock" v-for="item in this.testArr" @click="this.getNum()">
            <span>姓名:{{ item }}</span>
            <span>問卷標題：</span>
            <span>填寫時間：</span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div class="checkInfo" v-if="this.changePage == true">
        <ResCheck @backRes="this.backHome()"></ResCheck>
    </div>
</template>
<script>
import ResCheck from './ResCheck.vue'
export default {
    data() {
        return {
            testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            changePage:false,
        }
    },
    methods: {
        backHome(){
            this.changePage = false;
        },
        getNum(personId, surId){
        this.changePage = !this.changePage

        }
    },
    components:{
        ResCheck
    },
    mounted() {
        this.testArr = this.testArr.reverse()
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
            0px 0px 16px rgb(0, 0, 0, 0.1),
        ;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            box-shadow:
                inset 0px 0px 2em rgb(85, 255, 0, 0.5),
                0px 0px 30px rgb(25, 255, 15, 0.45);
            border: 3px solid rgb(11, 177, 11);

        }
    }
}

.checkInfo{
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