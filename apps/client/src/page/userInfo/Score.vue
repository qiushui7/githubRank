<template>
  <div class="Score-container">
    <div class="Score-container-header">
      <div class="Score-container-header-left">
        <span class="score">{{ star }}</span
        ><br />
        <span class="total">共{{ scoreList.length }}条评分</span>
      </div>
      <div class="Score-container-header-right">
        <div class="Score-container-header-right-item">
          <div style="height: 100%; width: 20%">
            <tiny-rate model-value="5" disabled :max="5"></tiny-rate>
          </div>
          <div style="flex: 1; margin-top: 12px">
            <tiny-progress
              :percentage="totalstar.five"
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
              :percentage="totalstar.four"
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
              :percentage="totalstar.three"
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
              :percentage="totalstar.two"
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
              :percentage="totalstar.first"
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
              <span> {{ item.user_id }}</span
              ><br />
              <tiny-rate
                :model-value="item.rating"
                :max="5"
                space="10px"
                size="10px"
                disabled
              ></tiny-rate>
            </div>
          </div>
          <div style="width: 50vw">
            <span>
              {{ item.message }}
            </span>
          </div>
          <div style="font-size: 10px; margin-top: 5px; color: #d3d3d3">
            <span> {{ item.created_at }} </span>
          </div>
        </div>
        <div>
          <tiny-pager
            layout="prev, pager, next"
            :total="scoreList"
            :pager-count="8"
            :hide-on-single-page="true"
            :current-page="page"
          ></tiny-pager>
        </div>
        <div
          style="width: 50vw; height: 10vh; text-align: center; font-size: 40px"
          v-if="scoreList.length == 0"
        >
          <span>空空如也</span>
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
import { onMounted, ref, computed } from 'vue';
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
let scoreList = ref([]);
let page = ref(1);
let pageList = computed(() => {
  return scoreList.value.slice((page.value - 1) * 8, page.value * 8);
});
let totalstar = computed(() => {
  let obj = {
    first: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  };
  let total = scoreList.value.length;
  if (total == 0) {
    return obj;
  }
  obj.first =
    Math.floor(
      scoreList.value.filter((item) => item.point == '1').length / total,
    ) * 100;
  obj.two =
    Math.floor(
      scoreList.value.filter((item) => item.point == '2').length / total,
    ) * 100;
  obj.three =
    Math.floor(
      scoreList.value.filter((item) => item.point == '3').length / total,
    ) * 100;
  obj.four =
    Math.floor(
      scoreList.value.filter((item) => item.point == '4').length / total,
    ) * 100;
  obj.five =
    Math.floor(
      scoreList.value.filter((item) => item.point == '5').length / total,
    ) * 100;
  return obj;
});
let star = computed(() => {
  if (scoreList.value.length == 0) {
    return 0;
  }
  let num = scoreList.value.reduce((pre, cur) => pre + parseInt(cur.point), 0);
  return num / scoreList.value.length;
});
let userScore = ref(0);
let userValue = ref('');
let uploadScore = async () => {
  if (userScore.value == 0 || userValue.value == '') {
    alert('请输入评论或评分');
    return;
  }
  let id = window.location.href.split('/')[4];
  let form = {};
  form['github_id'] = id;
  form['point'] = userScore.value;
  form['message'] = userValue.value;
  form['user'] = '123456';
  fetch('/api/user/appraise', {
    method: 'post',
    body: form,
  }).then((res) =>
    res.json().then((data) => {
      form.rating = form.point;
      scoreList.value.push(form);
      alert('评论成功');
    }),
  );
};
fetch('/api/user/getAppraise?github_id=yyx990803').then((res) =>
  res.json().then((data) => {
    scoreList.value = data;
  }),
);
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
