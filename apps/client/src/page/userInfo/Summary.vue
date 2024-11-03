<template>
  <div
    v-if="show"
    style="width: 44vw; margin-top: 3vh; margin-left: 5vw; height: 40vh"
  >
    <div id="tiny-basic-loading1" style="margin-top: 20vh"></div>
  </div>
  <div
    class="work-introduction"
    style="
      width: 44vw;
      margin-top: 3vh;
      margin-left: 5vw;
      font-size: 25px;
      line-height: 40px;
    "
    v-if="!show"
  >
    {{ content }}
  </div>
</template>
<script setup name="summary">
import { ref, onMounted } from 'vue';
import { TinyLoading, TinyButton } from '@opentiny/vue';
const loadingInstance = ref(null);
const closeLoading = () => {
  loadingInstance.value.close();
};
onMounted(() => {
  loadingInstance.value = TinyLoading.service({
    target: document.getElementById('tiny-basic-loading1'),
    size: 'large',
  });
});
fetch('/api/info/summary?github_id=yyx990803').then((res) =>
  res.json().then((data) => {
    content.value = data.summary;
    show.value = false;
  }),
);
let content = ref('');
let show = ref(true);
</script>
<style>
/* .summary-container{
    width: 70%;
    margin-top: 30px;
    margin-left: 10%;
    border: 1px solid red;
    height: 70%;
    font-size: 30px;
    padding-left: 15px;
} */
.work-introduction {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

p {
  line-height: 1.6;
  color: #555;
}
</style>
