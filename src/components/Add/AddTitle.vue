<template>

    <div class="surTitle titleArea" :class="{'closeArea' : this.location !== 1}">
        <h1>問卷標題</h1>
        <input type="text" @input="$emit(`update:title`, $event.target.value)">
    </div>
    <div class="surContent titleArea" :class="{'closeArea' : this.location !== 1}">
        <h1>問卷說明</h1>
        <textarea name="" id="" cols="50" rows="10" @input="$emit(`update:content`, $event.target.value)"></textarea>
    </div>
    <div class="surTime titleArea" :class="{'closeArea' : this.location !== 1}">
        <h1>開始時間：</h1>
        <input type="date" @input="$emit(`update:startTime`, $event.target.value)">
        <h1>結束時間：</h1>
        <input type="date" @input="$emit(`update:endTime`, $event.target.value)" >
        <h1>記名</h1>
        <input type="checkbox" id="namedBox" style="width: 40px;" @change="this.checkOff()">
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: [
        "title",
        "content",
        "startTime",
        "endTime",
        "location"
    ],
    emits:[
        'checkNamed',

    ],
    methods: {
        checkOff(){
            const checkbox = document.querySelector("#namedBox")
            this.$emit("checkNamed", checkbox.checked)
        }
    },
    mounted() {
    },
    updated(){
        // console.log(this.named)
    }
}
</script>
<style lang="scss" scoped>
.titleArea {
    margin: 0 auto;
    width: 80%;
    opacity: 1;
    transition: all 0.2s;
}

.surTitle {
    height: 20%;

    input {
        width: 100%;
        height: 100%;
        font-size: 40pt;
        padding-left: 10px;
    }
}

.surContent {
    height: 35%;

    textarea {
        font-size: 16pt;
        padding-left: 10px;
        resize: none;
        height: 100%;
        width: 100%;
    }
}

.surTime {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        margin-left: 1dvw;
        margin-right: 1dvw;
    }

    input {
        height: 40px;
        width: 150px;
        margin-right: 40px;
        padding-left: 20px;
        cursor: pointer;
    }
}
</style>