<template>
    <div class="total-container">
        <div class="total-container-header" v-for="(item) in Object.keys(totalList)" >
            <div class="total-container-title">
                <span>{{ item }}</span>
            </div>
            <div class="total-container-content">
                {{ totalList[item] }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    interface total{
        'Pushed to repos':Number,
        'Main languages':Number,
        'Total issues':Number,
        'Total forks':Number,
        'Total stars':Number,
        'Followers':Number
    }
    let totalList:total =
    {
        'Pushed to repos':92,
        'Main languages':11,
        'Total issues':192,
        'Total forks':1707,
        'Total stars':15904,
        'Followers':101745
    } 
</script>
<style scoped lang="less">
    .total-container{
        height: 80%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .total-container-header{
            width: 30%;
            height: 45%;
            .total-container-title{
                text-align: center;
                margin-top: 20px;
                font-size: large;
            }
            .total-container-content{
                text-align: center;
                margin-top: 30px;
                font-size: 40px;
            }
        }
    }
</style>