<template>
    <div class="resArea">
        <div class="resBlock" v-for="item in this.testArr">
            <span>姓名:{{ item }}</span>
            <span>問卷標題：</span>
            <span>填寫時間：</span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    },
    methods: {

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
        box-shadow:
            0px 0px 8px rgb(0, 0, 0, 0.2),
            0px 0px 16px rgb(0, 0, 0, 0.1),

            ;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>