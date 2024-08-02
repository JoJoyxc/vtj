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
          <th scope="row">lowerFirst</th>
          <td class="code">lowerFirst('Abc')</td>
          <td>{{ lowerFirst('Abc') }}</td>
        </tr>
        <tr>
          <th scope="row">upperFirst</th>
          <td class="code">upperFirst('abc')</td>
          <td>{{ upperFirst('abc') }}</td>
        </tr>
        <tr>
          <th scope="row">camelCase</th>
          <td class="code">camelCase('Foo Bar')</td>
          <td>{{ camelCase('Foo Bar') }}</td>
        </tr>
        <tr>
          <th scope="row">kebabCase</th>
          <td class="code">kebabCase('fooBar')</td>
          <td>{{ kebabCase('fooBar') }}</td>
        </tr>
        <tr>
          <th scope="row">snakeCase</th>
          <td class="code">snakeCase('FooBar')</td>
          <td>{{ snakeCase('FooBar') }}</td>
        </tr>
        <tr>
          <th scope="row">noop</th>
          <td class="code">noop()</td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">get</th>
          <td class="code">get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c')</td>
          <td>{{ get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') }}</td>
        </tr>
        <tr>
          <th scope="row">set</th>
          <td class="code">set({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4)</td>
          <td>{{ set({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4) }}</td>
        </tr>
        <tr>
          <th scope="row">merge</th>
          <td class="code">
            merge( { 'a': [{ 'b': 2 }, { 'd': 4 }] }, { 'a': [{ 'c': 3 }, {
            'e':5}] } )
          </td>
          <td>
            {{
              merge(
                {
                  a: [{ b: 2 }, { d: 4 }]
                },
                {
                  a: [{ c: 3 }, { e: 5 }]
                }
              )
            }}
          </td>
        </tr>
        <tr>
          <th scope="row">cloneDeep</th>
          <td class="code">cloneDeep({ a: 'aa' })</td>
          <td>{{ cloneDeep({ a: 'aa' }) }}</td>
        </tr>
        <tr>
          <th scope="row">debounce</th>
          <td class="code">debounce(()=> {}, 1000)</td>
          <!-- <td>{{ debounce(() => {}, 1000)() }}</td> -->
          <td>-</td>
        </tr>

        <tr>
          <th scope="row">throttle</th>
          <td class="code">throttle(()=> {}, 1000)</td>
          <!-- <td>{{ throttle(() => {}, 1000)() }}</td> -->
          <td>-</td>
        </tr>

        <tr>
          <th scope="row">template</th>
          <td class="code">template('hello)()</td>
          <td>{{ template('hello')() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {
    noop,
    upperFirst,
    camelCase,
    get,
    set,
    cloneDeep,
    merge,
    debounce,
    throttle,
    template,
    lowerFirst,
    kebabCase,
    snakeCase
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
    letter-spacing: 2px;
    font-size: 16px;
    font-style: italic;
  }
</style>
