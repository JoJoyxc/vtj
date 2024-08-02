<template>
  <div>
    <table border="1" style="width: 100%" align="center">
      <caption>
        数字格式化例子
      </caption>
      <thead>
        <tr>
          <th scope="col">函数名</th>
          <th scope="col" style="text-align: center">例子</th>
          <th scope="col" style="text-align: center">返回值</th>
        </tr>
      </thead>
      <tbody align="center">
        <tr>
          <th scope="row">numberFormat</th>
          <td class="code">numberFormat(124.665)</td>
          <td>{{ numberFormat(124.665) }}</td>
        </tr>

        <tr>
          <th scope="row">numberFormat</th>
          <td class="code">numberFormat(124.123, '0.0')</td>
          <td>{{ numberFormat(124.123, '0.0') }}</td>
        </tr>

        <tr>
          <th scope="row">numberFormat</th>
          <td class="code">numberFormat(124.123,'0.000')</td>
          <td>{{ numberFormat(124.123, '0.000') }}</td>
        </tr>

        <tr>
          <th scope="row">toFixed</th>
          <td class="code">toFixed(12.166, 2, true)</td>
          <td>{{ toFixed(12.166, 2, true) }}</td>
        </tr>

        <tr>
          <th scope="row">toFixed</th>
          <td class="code">toFixed(12.166, 2, false)</td>
          <td>{{ toFixed('12.166', 2, false) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { numberFormat, toFixed } from '@vtj/utils';
</script>

<style scoped>
  table {
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 14px;
  }

  caption {
    caption-side: top;
    padding: 10px;
    font-weight: bold;
    font-size: 22px;
  }

  thead,
  tfoot {
    background-color: rgb(228 240 245);
  }

  th {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }
  td {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }

  td:last-of-type {
    text-align: center;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .code {
    letter-spacing: 1px;
    font-size: 16px;
    font-style: italic;
  }
</style>
