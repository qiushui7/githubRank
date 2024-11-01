<template>
  <div style="width: 100%">
    <table style="width: 100%; margin-top: -1vh">
      <thead>
        <tr>
          <th>Repo</th>
          <th>Title</th>
          <th>State</th>
          <th>Created by</th>
          <th>Created at</th>
          <th>Latest update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in LatestIssuesList">
          <td>{{ item['Repo'] }}</td>
          <td>{{ item['Title'] }}</td>
          <td>{{ item['State'] }}</td>
          <td>{{ item['Created by'] }}</td>
          <td>{{ item['Created at'] }}</td>
          <td>{{ item['Latest update'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const LatestIssuesList = ref([
  {
    Repo: 'yyx990803/launch-editor',
    Title: 'feat: add filename validation for windows',
    State: 'closed',
    'Created by': 'dominikg',
    'Created at': '5 Sep 2024',
    'Latest update': '5 Sep 2024',
  },
]);
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
