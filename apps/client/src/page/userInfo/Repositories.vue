<template>
  <div style="width: 100%">
    <div
      style="
        width: 50vw;
        margin-top: -1vh;
        height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      v-if="!show"
    >
      <div id="tiny-basic-loading1"></div>
    </div>
    <table style="width: 50vw; margin-top: -1vh" v-if="show">
      <thead>
        <tr>
          <th>Name</th>
          <th>Language</th>
          <th>Creater at</th>
          <th>Push at</th>
          <th>Forks</th>
          <th>Stars</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in RepositoriesList">
          <td>{{ item['name'] }}</td>
          <td>{{ item['language'] }}</td>
          <td>{{ item['created_at'] }}</td>
          <td>{{ item['pushed_at'] }}</td>
          <td>{{ item['forks'] }}</td>
          <td>{{ item['stargazers_count'] }}</td>
          <td>{{ item['size'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TinyLoading, TinyButton } from '@opentiny/vue';
const loadingInstance = ref(null);
let show = ref(false);
onMounted(() => {
  loadingInstance.value = TinyLoading.service({
    customClass: 'new-loading',
    target: document.getElementById('tiny-basic-loading1'),
    background: '#595959',
  });
});
let RepositoriesList = ref([]);
fetch(`https://api.github.com/users/yyx990803/repos`).then((res) =>
  res.json().then((data) => {
    console.log(data);
    RepositoriesList.value = data;
    show.value = true;
  }),
);
</script>
<style scoped>
table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* 表头样式 */
thead {
  background-color: #007bff;
  color: white;
}

th {
  padding: 15px;
  text-align: left;
}

/* 表格行样式 */
tr {
  transition: background-color 0.3s ease;
}
/* 表格单元格样式 */
td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
