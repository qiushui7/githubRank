<template>
    <div class="nav-font">
        <div v-for="item in navList" :key=item @click="updateBar(item)"><span>
            {{ item }}
        </span></div>
    </div>
</template>
<script setup name="userInfoNavbar">
let navList = ['Total','Summary','Rankings','Score','Repositories','LatestIssues']
let tag = defineModel()
let updateBar = (data) =>{
    tag.value = data
}
</script>
<style scoped lang="less">
.nav-font{
    height: 100%;
    display: flex;
    div{
        height: 100%;
        margin-left: 40px;
        font-size: 35px;
    } 
    span:hover{
        cursor: grab;
        color: blue;
    }
}
</style>