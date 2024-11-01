<template>
  <div style="width: 100%">
    <table style="width: 55vw; margin-top: -1vh">
      <thead>
        <tr>
          <th>Name</th>
          <th>Language</th>
          <th>Creater at</th>
          <th>Push at</th>
          <th>Issues</th>
          <th>Forks</th>
          <th>Stars</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in RepositoriesList">
          <td>{{ item['Name'] }}</td>
          <td>{{ item['Language'] }}</td>
          <td>{{ item['Created at'] }}</td>
          <td>{{ item['Push at'] }}</td>
          <td>{{ item['Issues'] }}</td>
          <td>{{ item['Forks'] }}</td>
          <td>{{ item['Stars'] }}</td>
          <td>{{ item['Size'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
let RepositoriesList = ref([
  {
    Name: 'opensourcepledge.com',
    Language: 'JavaScript',
    'Created at': '2004-08-08',
    'Push at': '2004-08-08',
    Issues: 5,
    Forks: 18,
    Stars: 500,
    Size: 3900,
  },
]);
for (let i = 1; i < 20; i++) {
  RepositoriesList.value[i] = RepositoriesList.value[0];
}
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
