<template>
  <div>
    <table border="1" style="width: 100%" align="center">
      <caption>
        字符串转换例子
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
          <th scope="row" rowspan="2">isUrl</th>
          <td class="code">isUrl('https://www.baidu.com/')</td>
          <td>{{ isUrl('https://www.baidu.com/') }}</td>
        </tr>
        <tr>
          <td class="code">isUrl('www.baidu.com/')</td>
          <td>{{ isUrl('www.baidu.com/') }}</td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">isEmail</th>
          <td class="code">isEmail('1111.com')</td>
          <td>{{ isEmail('1111.com') }}</td>
        </tr>
        <tr>
          <td class="code">isUrl('11@11.com')</td>
          <td>{{ isEmail('11@11.com') }}</td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">isIdCardNo</th>
          <td class="code">isIdCardNo('110220300014253678')</td>
          <td>{{ isIdCardNo('110220300014253678') }}</td>
        </tr>
        <tr>
          <td class="code">isIdCardNo('19')</td>
          <td>{{ isIdCardNo('19') }}</td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">isMobilePhone</th>
          <td class="code">isMobilePhone('18912345678')</td>
          <td>{{ isMobilePhone('18912345678') }}</td>
        </tr>
        <tr>
          <td class="code">isMobilePhone('19')</td>
          <td>{{ isMobilePhone('19') }}</td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">isCarNo</th>
          <td class="code">isCarNo('粤999999')</td>
          <td>{{ isCarNo('粤999999') }}</td>
        </tr>
        <tr>
          <td class="code">isMobilePhone('粤A99999')</td>
          <td>{{ isCarNo('粤A99999') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {
    isUrl,
    isEmail,
    isIdCardNo,
    isMobilePhone,
    isCarNo
  } from '@vtj/utils';
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
