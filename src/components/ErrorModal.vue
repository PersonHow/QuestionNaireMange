<script>
export default{
    data(){
        return{

        }
    },
    emits:[
        'alertMessage'
    ]
}</script>

<template>
<div class="errorArea">
    <div class="modalArea">
        <i class="fa-solid fa-xmark" @click="$emit('alertMessage')"></i>
        <div class="content">
            <slot></slot>
        </div>
    </div>
    <div class="bg">
    </div>
</div>

</template>

<style lang="scss" scoped>
.errorArea{
    width: 100dvw;
    height: 200dvh;
    position: fixed;
    top:-10dvw;
    left:0;
    z-index: 1;

    .modalArea{
        width: 40dvw;
        height: 40dvh;
        background: rgb(255,255,255);
        z-index: 2;
        position: absolute;
        top:45dvh;
        left:30%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .fa-xmark{
            font-size: 4dvw;
            cursor: pointer;
            position: absolute;
            right: 2dvw;
            top:4dvh;
            color:rgb(77, 95, 69);
            transition: 0.2s;
            &:hover{
                scale: 1.1;
                color:rgb(152, 198, 133);
            }

            &:active{
                scale: 0.9;
                color:rgb(77, 95, 69);
            }
        }

        .content{

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

    }
    .bg{
    width:100dvw;
    height: 200dvh;
    background: rgba(100, 156, 98, 0.25);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    }
}

</style>