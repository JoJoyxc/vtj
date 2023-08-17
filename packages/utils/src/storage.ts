import { isClient } from '@vueuse/core';
/**
 * 缓存操作模块，提供sessionStorage和localStorage操作
 * @module storage
 * @author 陈华春
 */

// /**
//  * sessionStorage
//  * @const
//  * @type {Storage}
//  */

// const SESSION: Storage = window.sessionStorage || {};

// /**
//  * localStorage
//  * @type {Storage}
//  */
// const LOCAL: Storage = window.localStorage || {};

/**
 * 内存缓存
 * @type {{}}
 */
let CACHES: Record<string, any> = {};

/**
 * 存储方式映射
 */
const TYPES: Record<string, any> = {
  local: isClient ? window.localStorage : CACHES,
  session: isClient ? window.sessionStorage : CACHES,
  cache: CACHES
};

const defaultOptions = {
  type: 'cache',
  expired: 0,
  prefix: '__NewPearl__'
};

/**
 * 保存缓存
 * @param {string} key 缓存key
 * @param {String|Object|Array} value 缓存值，对象、数组类型自动JSON.stringify成字符串
 * @param {object} [opts] 选项
 * @param {Object} [opts.type=cache] 存储方式 local、 session、cache
 * @param {number} [opts.expired=0] 过期时间，单位毫秒
 * @param {string} [opts.prefix=__NewPearl__] key 前缀
 */
export function save(key: string, value: any = '', opts = {}) {
  if (!key) return;
  const { type, expired, prefix } = { ...defaultOptions, ...opts };
  const timestamp = Date.now();
  const realKey = prefix + key;
  const storage = TYPES[type] || CACHES;
  const info = {
    value,
    timestamp,
    expired
  };
  if (storage === CACHES) {
    storage[realKey] = info;
  } else {
    storage.setItem(realKey, JSON.stringify(info));
  }
}

/**
 * 获取缓存
 * @param {string} key 缓存key
 * @param {object} [opts] 选项
 * @param {Object} [opts.type=cache] 存储方式 local、 session、cache
 * @param {number} [opts.expired=0] 过期时间，单位毫秒
 * @param {string} [opts.prefix=__NewPearl__] key 前缀
 * @returns {String|Object|Array}
 */
export function get(key: string, opts = {}) {
  if (!key) return;
  const { type, prefix } = { ...defaultOptions, ...opts };
  const realKey = prefix + key;
  const storage = TYPES[type] || CACHES;
  let info;
  if (storage === CACHES) {
    info = storage[realKey];
  } else {
    const content = storage.getItem(realKey);
    if (content) {
      info = JSON.parse(content);
    }
  }
  // 不存在缓存
  if (!info) return null;
  const { value, timestamp, expired } = info;
  // 缓存是否过期
  const isExpired = expired > 0 && timestamp + expired < Date.now();
  // 过期清空缓存，返回null
  if (isExpired) {
    remove(key, opts);
    return null;
  }
  return value;
}

/**
 * 删除缓存
 * @param {string} key 缓存key
 * @param {object} [opts] 选项
 * @param {Object} [opts.type=cache] 存储方式 local、 session、cache
 * @param {string} [opts.prefix=__NewPearl__] key 前缀
 */
export function remove(key: string, opts = {}) {
  if (!key) return;
  const { type, prefix } = { ...defaultOptions, ...opts };
  const storage = TYPES[type] || CACHES;
  const realKey = prefix + key;
  if (storage === CACHES) {
    delete storage[realKey];
  } else {
    storage.removeItem(realKey);
  }
}

/**
 * 删除全部缓存
 * @param {object} [opts] 选项
 * @param {Object} [opts.type=cache] 存储方式 local、 session、cache
 */
export function clear(opts = {}) {
  const { type } = { ...defaultOptions, ...opts };
  const storage = TYPES[type] || CACHES;
  if (storage === CACHES) {
    CACHES = {};
  } else {
    storage.clear();
  }
}

export default {
  save,
  get,
  remove,
  clear
};
