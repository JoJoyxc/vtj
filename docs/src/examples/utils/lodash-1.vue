<template>
  <div v-show="false">
    <div>isString('abc') => {{ isString('abc') }}</div>
    <div>isString(123) => {{ isString(123) }}</div>

    <div>isFunction('a') => {{ isFunction('a') }}</div>
    <div>isFunction(()=>{}) => {{ isFunction(() => {}) }}</div>

    <div>isArray('abc') => {{ isArray('abc') }}</div>
    <div>isArray([1,2,3]) => {{ isArray([1, 2, 3]) }}</div>

    <div>isObject('abc') => {{ isObject('abc') }}</div>
    <div>isObject({}) => {{ isObject({}) }}</div>

    <div>isBoolean('abc') => {{ isBoolean('abc') }}</div>
    <div>isBoolean(false) => {{ isBoolean(false) }}</div>

    <div>isBuffer(new Uint8Array(2)) => {{ isBuffer(uint8Array) }}</div>
    <div>isBuffer(new Buffer(2)) => {{ isBuffer(buffer) }}</div>

    <div>isArrayBuffer(new Array(2)) => {{ isArrayBuffer(new Array(2)) }}</div>
    <div>
      isArrayBuffer(new ArrayBuffer(2)) =>
      {{ isArrayBuffer(arrayBuffer) }}
    </div>

    <div>isDate('Mon April 23 2012') => {{ isDate('Mon April 23 2012') }}</div>
    <div>isDate(new Date) => {{ isDate(new Date()) }}</div>

    <div>isUndefined(null) => {{ isUndefined(null) }}</div>
    <div>isUndefined(void 0) => {{ isUndefined(void 0) }}</div>

    <div>isNaN(111) => {{ isNaN(111) }}</div>
    <div>isNaN(new Number(NaN)) => {{ isNaN(new Number(NaN)) }}</div>

    <div>isNull({}) => {{ isNull({}) }}</div>
    <div>isNull(null) => {{ isNull(null) }}</div>

    <div>isNumber({}) => {{ isNumber({}) }}</div>
    <div>isNumber(1) => {{ isNumber(1) }}</div>

    <div>isSymbol({}) => {{ isSymbol({}) }}</div>
    <div>isSymbol(Symbol()) => {{ isSymbol(symbolVal) }}</div>

    <div>isPlainObject(11) => {{ isPlainObject(111) }}</div>
    <div>isPlainObject({ x: 0, y: 0 }) {{ isPlainObject({ x: 0, y: 0 }) }}</div>

    <div>
      isEqual({a:'a'}, {a:'a'}) => {{ isEqual({ a: 'a' }, { a: 'a' }) }}
    </div>
    <div>isEqual(null,1) => {{ isEqual(null, 1) }}</div>
  </div>

  <table border="1" style="width: 100%" align="center">
    <caption>
      数据类型校验例子
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
        <th scope="row" rowspan="2">isString</th>
        <td class="code">isString('abc')</td>
        <td>{{ isString('abc') }}</td>
      </tr>
      <tr>
        <td class="code">isString(123)</td>
        <td>{{ isString(123) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isFunction</th>
        <td class="code">isFunction('abc')</td>
        <td>{{ isFunction('abc') }}</td>
      </tr>
      <tr>
        <td class="code">isFunction(()=>{})</td>
        <td>{{ isFunction(() => {}) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isArray</th>
        <td class="code">isArray('abc')</td>
        <td>{{ isArray('abc') }}</td>
      </tr>
      <tr>
        <td class="code">isArray([])</td>
        <td>{{ isArray([]) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isObject</th>
        <td class="code">isObject('abc')</td>
        <td>{{ isObject('abc') }}</td>
      </tr>
      <tr>
        <td class="code">isObject({})</td>
        <td>{{ isObject({}) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isBoolean</th>
        <td class="code">isBoolean('abc')</td>
        <td>{{ isBoolean('abc') }}</td>
      </tr>
      <tr>
        <td class="code">isBoolean(false)</td>
        <td>{{ isBoolean(false) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isBuffer</th>
        <td class="code">isBuffer(new Uint8Array(2))</td>
        <td>{{ isBuffer(uint8Array) }}</td>
      </tr>
      <tr>
        <td class="code">isBuffer(new Buffer(2))</td>
        <td>{{ isBuffer(buffer) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isArrayBuffer</th>
        <td class="code">isArrayBuffer(new Array(2))</td>
        <td>{{ isArrayBuffer(new Array(2)) }}</td>
      </tr>
      <tr>
        <td class="code">isArrayBuffer(new ArrayBuffer(2))</td>
        <td>{{ isArrayBuffer(arrayBuffer) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isDate</th>
        <td class="code">isDate('Mon April 23 2012')</td>
        <td>{{ isDate('Mon April 23 2012') }}</td>
      </tr>
      <tr>
        <td class="code">isDate(new Date())</td>
        <td>{{ isDate(new Date()) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isUndefined</th>
        <td class="code">isUndefined(null)</td>
        <td>{{ isUndefined(null) }}</td>
      </tr>
      <tr>
        <td class="code">isUndefined(void 0)</td>
        <td>{{ isUndefined(void 0) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isNaN</th>
        <td class="code">isNaN(111)</td>
        <td>{{ isNaN(111) }}</td>
      </tr>
      <tr>
        <td class="code">isNaN(new Number(NaN))</td>
        <td>{{ isNaN(new Number(NaN)) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isNull</th>
        <td class="code">isNull({})</td>
        <td>{{ isNull({}) }}</td>
      </tr>
      <tr>
        <td class="code">isNull(null)</td>
        <td>{{ isNull(null) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isNumber</th>
        <td class="code">isNumber({})</td>
        <td>{{ isNumber({}) }}</td>
      </tr>
      <tr>
        <td class="code">isNumber(111)</td>
        <td>{{ isNumber(111) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isSymbol</th>
        <td class="code">isSymbol({})</td>
        <td>{{ isSymbol({}) }}</td>
      </tr>
      <tr>
        <td class="code">isSymbol(Symbol())</td>
        <td>{{ isSymbol(symbolVal) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isPlainObject</th>
        <td class="code">isPlainObject(11)</td>
        <td>{{ isPlainObject(11) }}</td>
      </tr>
      <tr>
        <td class="code">isPlainObject({ x: 0, y: 0 })</td>
        <td>{{ isPlainObject({ x: 0, y: 0 }) }}</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">isEqual</th>
        <td class="code">isEqual(11, 22)</td>
        <td>{{ isEqual(11, 22) }}</td>
      </tr>
      <tr>
        <td class="code">isEqual({ a:'a' },{a:'a'})</td>
        <td>{{ isEqual({ a: 'a' }, { a: 'a' }) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import {
    isString,
    isFunction,
    isArray,
    isObject,
    isBoolean,
    isBuffer,
    isArrayBuffer,
    isDate,
    isUndefined,
    isNaN,
    isNull,
    isNumber,
    isSymbol,
    isPlainObject,
    isEqual
  } from '@vtj/utils';

  const symbolVal = Symbol();

  const uint8Array = new Uint8Array(2);

  const buffer = new Buffer(2);

  const arrayBuffer = new ArrayBuffer(2);
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
