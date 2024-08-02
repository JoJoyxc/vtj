<template>
  <div>
    <table border="1" style="width: 100%" align="center">
      <caption>
        加密解密例子
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
          <th scope="row">MD5</th>
          <td class="code">MD5('Abc')</td>
          <td>{{ MD5('Abc') }}</td>
        </tr>
        <tr>
          <th scope="row">base64</th>
          <td class="code">base64('Abc')</td>
          <td>{{ base64('Abc') }}</td>
        </tr>
        <tr>
          <th scope="row">unBase64</th>
          <td class="code">unBase64(base64('Abc'))</td>
          <td>{{ unBase64(base64('Abc')) }}</td>
        </tr>
        <tr>
          <th scope="row">RSA</th>
          <td class="code">RSA('abc')</td>
          <td>{{ RSA('abc') }}</td>
        </tr>
        <tr>
          <th scope="row">RSA</th>
          <td class="code">unRSA(RSA('abc'))</td>
          <td>{{ unRSA(unRSAVal) }}</td>
        </tr>
        <tr>
          <th scope="row">AES</th>
          <td class="code">AES('abc', 'a')</td>
          <td>{{ AES('abc', 'aaa') }}</td>
        </tr>
        <tr>
          <th scope="row">unAES</th>
          <td class="code">unAES(AES('abc', 'a'), 'a')</td>
          <td>{{ val }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { MD5, base64, unBase64, RSA, unRSA, AES, unAES } from '@vtj/utils';

  const unRSAVal: string = RSA('abc') as string;

  const unAESVal = AES('abc', 'a');
  const val = unAES(unAESVal, 'a');
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
