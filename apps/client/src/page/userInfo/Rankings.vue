<template>
    <div class="Ranking-container">
      <div class="Ranking-Languages">
        <tiny-chart-histogram :options="languagesOptions" width="600px" height="270px"></tiny-chart-histogram>
      </div>
      <div class="Ranking-Issues">
        <tiny-chart-histogram :options="issuesOption" width="600px" height="270px"></tiny-chart-histogram>
      </div>
      <div class="Ranking-Forks">
        <tiny-chart-histogram :options="forksOption" width="600px" height="270px"></tiny-chart-histogram>
      </div>
      <div class="Ranking-Stars">
        <tiny-chart-histogram :options="starsOption" width="600px" height="270px"></tiny-chart-histogram>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ChartHistogram as TinyChartHistogram } from '@opentiny/vue'
import { ref } from 'vue'
const languagesOptions = ref({
  itemStyle: {
    barMinHeight: 2 // 最小高度为2
  },
  data: [
    { '语言': 'JavaScript', 'Value': 53 },
    { '语言': 'TypeScript', 'Value': 8 },
    { '语言': 'HTML', 'Value': 3 },
    { '语言': 'Vue', 'Value': 2 },
    { '语言': 'Rust', 'Value': 1 },
    // { '语言': 'Dart', 'Value': 1 },
    // { '语言': 'Go', 'Value': 1 },
    // { '语言': 'PHP', 'Value': 1 },
    // { '语言': 'Ruby', 'Value': 1 },
    // { '语言': 'Python', 'Value': 1 },
  ],
  width:"auto",
  xAxis: {
    data: '语言'
  },
  yAxis: {
    name: 'Languages'
  }
})
const issuesOption=ref({
  itemStyle: {
    barMinHeight: 5 // 最小高度为2
  },
  data: [
    { 'issues': 'register-service', 'Value': 53 },
    { 'issues': 'repro', 'Value': 8 },
    { 'issues': 'laravel-vue-cli-3', 'Value': 3 },
    { 'issues': 'pug-plain-loader', 'Value': 2 },
    // { 'issues': 'Rust', 'Value': 1 },
    // { 'issues': 'Dart', 'Value': 1 },
    // { 'issues': 'Go', 'Value': 1 },
    // { 'issues': 'PHP', 'Value': 1 },
    // { 'issues': 'Ruby', 'Value': 1 },
    // { 'issues': 'Python', 'Value': 1 },
  ],
  width:"auto",
  xAxis: {
    data: 'issues'
  },
  yAxis: {
    name: 'Issues'
  }
})
const forksOption=ref({
  itemStyle: {
    barMinHeight: 5 // 最小高度为2
  },
  data: [
    { 'forks': 'HTML5-Clear-v2', 'Value': 53 },
    { 'forks': 'vue-wordle', 'Value': 8 },
    { 'forks': 'laravel-vue-cli-3', 'Value': 3 },
    { 'forks': 'launch-editor', 'Value': 2 },
    // { 'issues': 'Rust', 'Value': 1 },
    // { 'issues': 'Dart', 'Value': 1 },
    // { 'issues': 'Go', 'Value': 1 },
    // { 'issues': 'PHP', 'Value': 1 },
    // { 'issues': 'Ruby', 'Value': 1 },
    // { 'issues': 'Python', 'Value': 1 },
  ],
  xAxis: {
    data: 'forks'
  },
  yAxis: {
    name: 'forks'
  }
})
const starsOption=ref({
  itemStyle: {
    barMinHeight: 5 // 最小高度为2
  },
  data: [
    { 'stars': 'HTML5-Clear-v2', 'Value': 53 },
    { 'stars': 'vue-wordle', 'Value': 8 },
    { 'stars': 'laravel-vue-cli-3', 'Value': 3 },
    { 'stars': 'launch-editor', 'Value': 2 },
    // { 'issues': 'Rust', 'Value': 1 },
    // { 'issues': 'Dart', 'Value': 1 },
    // { 'issues': 'Go', 'Value': 1 },
    // { 'issues': 'PHP', 'Value': 1 },
    // { 'issues': 'Ruby', 'Value': 1 },
    // { 'issues': 'Python', 'Value': 1 },
  ],
  xAxis: {
    data: 'stars'
  },
  yAxis: {
    name: 'stars'
  }
})
</script>
<style scoped lang="less">
  .Ranking-container{
    display: flex;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
    div{
      width: 48%;
      height: 45%;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
</style>