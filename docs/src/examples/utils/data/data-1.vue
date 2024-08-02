<template>
  <div>
    <table border="1" style="width: 100%" align="center">
      <caption>
        数据转换例子
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
          <th scope="row">arrayToMap</th>
          <td class="code">arrayToMap([{a:'a'},{b:'b'}])</td>
          <td>{{ arrayToMap([{ a: 'a' }, { b: 'b' }]) }}</td>
        </tr>

        <tr>
          <th scope="row">mapToObject</th>
          <td class="code">mapToObject(new Map().set('a', 1).set('b', 2))</td>
          <td>{{ mapToObject(new Map().set('a', 1).set('b', 2)) }}</td>
        </tr>

        <tr>
          <th scope="row">arrayToKv</th>
          <td class="code">
            arrayToKv([ { "key": "a", "value": "a" }, { "key": "b", "value": "b"
            } ])
          </td>
          <td>
            {{
              arrayToKv([
                { key: 'a', value: 'a' },
                { key: 'b', value: 'b' }
              ])
            }}
          </td>
        </tr>

        <tr>
          <th scope="row">kvToArray</th>
          <td class="code">kvToArray({ a: 'a', b: 'b' })</td>
          <td>{{ kvToArray({ a: 'a', b: 'b' }) }}</td>
        </tr>

        <tr>
          <th scope="row">dedupArray</th>
          <td class="code">
            dedupArray([1, false, 'aa', 3, 3,undefined, null, {}, []])
          </td>
          <td>
            {{ dedupArray([1, false, 'aa', 3, 3, undefined, null, {}, []]) }}
          </td>
        </tr>

        <tr>
          <th scope="row">toArray</th>
          <td class="code">toArray({ a: 1, b: '2' })</td>
          <td>
            {{ toArray({ a: 1, b: '2' }) }}
          </td>
        </tr>

        <tr>
          <th scope="row">zipObject</th>
          <td class="code">zipObject({ a: 1, b: '2',c:null,d:undefined })</td>
          <td>
            {{ zipObject({ a: 1, b: '2', c: null, d: undefined }) }}
          </td>
        </tr>

        <tr>
          <th scope="row">omit</th>
          <td class="code">omit({ a: 'a', b: 'b' } , 'a')</td>
          <td>
            <!-- {{ omit({ a: 'a', b: 'b' }, 'a') }} -->
          </td>
        </tr>

        <tr>
          <th scope="row">pick</th>
          <td class="code">pick(['a', '1', 2], 'a')</td>
          <td>
            <!-- {{ pick({ a: 'a', b: 'b' }, 'a') }} -->
          </td>
        </tr>

        <tr>
          <th scope="row">trim</th>
          <td class="code">trim([' a ', '1', ' 1 '])</td>
          <td>
            {{ trim(['a    ', '1', '  1  ']) }}
          </td>
        </tr>

        <tr>
          <th scope="row">sum</th>
          <td class="code">sum([{age:11},{age:22}])</td>
          <td>
            {{ sum([{ age: 11 }, { age: 22 }], 'age') }}
          </td>
        </tr>
        <tr>
          <th scope="row">avg</th>
          <td class="code">avg([{age:11},{age:22}])</td>
          <td>
            {{ avg([{ age: 11 }, { age: 22 }], 'age') }}
          </td>
        </tr>
        <tr>
          <th scope="row">splitParser</th>
          <td class="code">splitParser('1,2,3,4')</td>
          <td>
            {{ splitParser('1,2,3,4') }}
          </td>
        </tr>
        <tr>
          <th scope="row">splitParser</th>
          <td class="code">splitStringify([1, 2, 3, 4], '-')</td>
          <td>
            {{ splitStringify([1, 2, 3, 4], '-') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {
    arrayToMap,
    mapToObject,
    arrayToKv,
    kvToArray,
    dedupArray,
    toArray,
    zipObject,
    omit,
    pick,
    trim,
    sum,
    avg,
    splitParser,
    splitStringify
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
