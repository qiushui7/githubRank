<template>
    <div class="userInfo-container">
        <div class="userInfo-left">
            <div class="userInfo-img">
                <img src="https://avatars.githubusercontent.com/u/499550?v=4" alt="github">
            </div>
            <div class="userInfo-title">
                <span class="userInfo-title-name">
                    {{ userInfo.name }}
                </span><br>
                <span class="userInfo-title-joinTime">
                    {{ userInfo.joinTime }}
                </span>
            </div>
            <div class="userInfo-Repo">
                <span style="padding-left: 10%;">Repo types</span>
                <div class="userInfo-Repo-charts">
                    <tiny-chart-pie :options="options" height="300px" width="400px"></tiny-chart-pie>
                </div>
            </div>
        </div>
        <div class="userInfo-right">
            <div class="userInfo-right-nav">
                <userInfoNavbar style="width: 100%; height: 100%;" v-model="tag"/> 
            </div>
            <div class="userInfo-right-content" style="width: 100%; height: 80%;">
                <Suspense style="width: 98%;height: 100%;">
                    <template #default style="width: 100%;height: 100%;">
                        <component :is="componentTag" ></component>
                     </template>
                     <template #fallback>
                       <div>Loading took too long!</div>
                     </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>
<script setup name="userInfo" lang="ts">
import { computed, ref ,shallowRef} from 'vue'
import { ChartPie as TinyChartPie } from '@opentiny/vue'
import userInfoNavbar from './UserinfoNavbar.vue';
import Total from './Total.vue';
import Summary from './Summary.vue';
import Rankings from './Rankings.vue';
import Score from './Score.vue';
import Repositories from './Repositories.vue';
import LatestIssues from './LatestIssues.vue';
let obj= {
    'Total':Total,
    'Summary':Summary,
    'Rankings':Rankings,
    'Score':Score,
    'Repositories':Repositories,
    'LatestIssues':LatestIssues
}
let tag = ref('Total')
const componentTag = computed(()=>{
    return obj[tag.value]
})
let userInfo = {
    name:'Evan You',
    joinTime:'Joined GitHub 28 Nov 2010'
}
const options = ref({
  type: 'pie',
  position: {
    center: ['20%', '40%']
  },
  selectedMode: 'multipe',
  legend: {
    show: true,
    position: {
      left: 'center',
      bottom: '10%',
      left:'5%'
    },
    orient: 'horizontal',
    // 同意对图例图标设置类型，默认circle, 可选值: rect, roundRect, triangle, diamond; 若定义了legend.data, 则此属性失效。
    icon: 'circle',
    // 控制图例图标的高度
    itemHeight: 20,
    // 控制图例图标的宽度
    itemWidth: 20
  },
  label: {
    show: false,
    type: 'percent',
    line: false
  },
  data: [
    { value: 100, name: 'VPC' },
    { value: 90, name: 'IM' },
    { value: 49, name: 'EIP' },
    { value: 14, name: 'SG' }
  ]
})
</script>
<style scoped lang="less">
.userInfo-container{
    margin-top: 10%;
    display: flex;
    margin-left: 50px;
    width: 90vw;
    .userInfo-left{
        height: 80vh;
        width: 200px;
        .userInfo-Repo{
            font-size: 25px;
            margin-top: 10vh;
            .userInfo-Repo-charts{
                padding-left: 0%;
            }
        }
        .userInfo-title-name{
            width: 100%;
            padding-left: 30%;
        }
        .userInfo-img{
        height: 180px;
        width: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    }
    .userInfo-right{
        margin-left: 50px;
        height:80vh;
        flex: 1;
        .userInfo-right-nav{
            height: 10%;
            border: 1px solid bisque;
        }
        .userInfo-right-content{
            height: 90%;
        }
    }
    
}
</style>