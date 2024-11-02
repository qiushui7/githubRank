<template>
  <div style="width: 100%">
    <table style="width: 55vw; margin-top: -1vh">
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
import { ref } from 'vue';
interface UserInfo {
  repos_url: string;
}
let reposUrl = defineProps<{
  userInfo: UserInfo;
}>();
let RepositoriesList = ref([]);
fetch(`${reposUrl.userInfo.repos_url}`).then((res) =>
  res.json().then((data) => {
    RepositoriesList.value = data;
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
