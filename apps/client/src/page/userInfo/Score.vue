<template>
  <div class="Score-container">
    <div class="Score-container-header">
      <div class="Score-container-header-left">
        <span class="score">4.8</span><br />
        <span class="total">共1382条评分</span>
      </div>
      <div class="Score-container-header-right">
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="5" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="75"
              color="blue"
              :stroke-width="10"
              :show-text="false"
            ></tiny-progress>
          </div>
        </div>
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="4" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="20"
              color="blue"
              :stroke-width="10"
              :show-text="false"
            ></tiny-progress>
          </div>
        </div>
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="3" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="3"
              color="blue"
              :stroke-width="10"
              :show-text="false"
            ></tiny-progress>
          </div>
        </div>
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="2" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="2"
              color="blue"
              :stroke-width="10"
              :show-text="false"
            ></tiny-progress>
          </div>
        </div>
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="1" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="1"
              color="blue"
              :stroke-width="10"
              :show-text="false"
            ></tiny-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="Score-container-content">
      <div style="margin-left: 17vw; margin-top: -3vh; display: flex">
        <div>
          <span style="text-align: end; line-height: 40px">评分</span>
        </div>
        <div style="padding-bottom: 10px">
          <tiny-rate v-model="userScore" :max="5" size="20px"></tiny-rate>
        </div>
      </div>
      <div class="content-user" style="margin-top: 1vh">
        <textarea
          id="myTextarea"
          placeholder="在这里留下你的评论吧"
          v-model="userValue"
        ></textarea>
        <div class="content-user-rate">
          <button
            style="
              margin-left: 20vw;
              background-color: #4169e1;
              cursor: grab;
              width: 4vw;
              height: 4vh;
            "
            @click="uploadScore"
          >
            发布
          </button>
        </div>
      </div>
      <div class="content-body">
        <div class="content-body-header">
          <span> 全部评论</span>
        </div>
        <div style="margin-left: 10px" v-for="item in scoreList" :key="item">
          <div class="body-img" style="display: flex; margin-top: 10px">
            <div>
              <img :src="item.img" alt="" class="img" />
            </div>
            <div style="line-height: 20px; height: 50px; margin-left: 15px">
              <span> {{ item.name }}</span
              ><br />
              <tiny-rate
                :model-value="item.score"
                :max="5"
                space="10px"
                size="10px"
              ></tiny-rate>
            </div>
          </div>
          <div style="width: 50vw">
            <span>
              {{ item.content }}
            </span>
          </div>
          <div style="font-size: 10px; margin-top: 5px; color: #d3d3d3">
            <span> {{ item.time }} | {{ item.position }} </span>
          </div>
        </div>
        <div>
          <tiny-pager
            layout="prev, pager, next"
            :total="20"
            :pager-count="8"
          ></tiny-pager>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Rate as TinyRate } from '@opentiny/vue';
import {
  Progress as TinyProgress,
  Button as TinyButton,
  TinyPager,
} from '@opentiny/vue';
import { onMounted, ref } from 'vue';
onMounted(() => {
  const textarea = document.getElementById('myTextarea');
  function autoResize() {
    console.log(textarea.scrollHeight);
    textarea.style.height = 'auto';

    textarea.style.height = textarea.scrollHeight - 6 + 'px';
  }
  textarea.addEventListener('input', autoResize);
  const originalBorderColor = textarea.style.borderColor;
  textarea.addEventListener('focus', function (e) {
    e.preventDefault();
    textarea.style.borderColor = '#4CAF50';
  });
  textarea.addEventListener('blur', function () {
    textarea.style.borderColor = originalBorderColor;
  });
});
let scoreList = ref([
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024 -08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
  {
    img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    score: 4,
    name: '项久桢',
    content:
      'xd不用给挂了的搞成红色吧，这样每次第一眼都是看到醒目的挂了的，不会影响心情嘛，很多公司他就不招人，挂了也不是咱的问题。祝好哈',
    time: '2024-08-08',
    position: '四川',
  },
]);
let userScore = ref(0);
let userValue = ref('');
let uploadScore = async () => {
  let form = new FormData();
  let utcDate = new Date();
  let offsetInHours = 8;
  let chinaDate = new Date(utcDate.getTime());
  let year = chinaDate.getFullYear();
  let month = chinaDate.getMonth() + 1;
  let day = chinaDate.getDate();
  let hour = chinaDate.getHours();
  form.append('score', userScore);
  form.append('content', userValue);
  form.append('time', `${year}-${month}-${day}`);
  let position = '未知地区';
  await fetch('http://ip-api.com/json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log('国家：', data.country);
      console.log('地区：', data.regionName);
      position = data.regionName;
    })
    .catch((error) => console.error('IP地理定位出错：', error));
  console.log(year, month, day, hour);
};
</script>
<style scoped lang="less">
.Score-container {
  height: 100%;
  width: 100%;
  .Score-container-header {
    height: 20vh;
    width: 100%;
    display: flex;
    .Score-container-header-left {
      height: 100%;
      width: 30%;
      text-align: center;
      line-height: normal;
      .score {
        color: blue;
        font-size: 60px;
        line-height: 80px;
      }
      .total {
        margin-top: -30px;
      }
    }
    .Score-container-header-right {
      flex: 1;
      .Score-container-header-right-item {
        margin-top: 5px;
        display: flex;
      }
    }
  }
  .Score-container-content {
    margin-top: 30px;
    height: 70%;
    width: 100%;
    .content-user-rate {
      margin-left: 15vw;
      margin-top: 10px;
    }
    textarea:focus {
      border-color: #4caf50;
    }
    textarea:not(:focus) {
      height: 28px;
    }
    #myTextarea {
      outline: none;
      font-size: 18px;
      width: 40vw;
      height: auto;
      padding-left: 5px;
      min-height: 20px;
      border: 1px solid #ccc;
      resize: none;
      margin-left: 5vw;
      overflow: hidden;
    }
    .content-body {
      width: 100%;
      height: 10%;
    }
  }
}
.body-img {
  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
