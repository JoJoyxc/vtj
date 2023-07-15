export const UrlRegex = /^(http|https):\/\/[\w.:\-@]*/;

export function isUrl(txt: string) {
  return UrlRegex.test(txt);
}

/**
 * 获取当前页面的 host
 * @param {boolean} includePath 带上 pathname
 * @return {string}
 */
export function getCurrentHost(includePath: boolean) {
  const { protocol, host, pathname } = location;
  return `${protocol}//${host}${includePath ? pathname : ''}`;
}

/**
 * 获取指定url的host
 * @param {string} url
 * @return {string} host
 */
export function getHost(url: string = '') {
  const matches = url.match(UrlRegex);
  if (matches) {
    return matches[0];
  }
  return '';
}

/**
 * 键值对转换成查询字符串
 * @param {object} query 键值对，对象
 * @returns {string} 查询参数字符串
 */
export function stringify(query: Record<string, any>) {
  const array = [];
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      array.push([key, encodeURIComponent(query[key])].join('='));
    }
  }
  return array.join('&');
}

/**
 * 参数字符串转换成对象形式，如：a=1&b=2 转换成 {a:1, b:2}
 * @param {String} str 需要转换的字符串
 * @param {String} [sep=&] 连接符，可选，默认 &
 * @param {String} [eq==] 键值间隔符，可选，默认 =
 * @returns {Object}
 */
export function parse(str: string, sep?: string, eq?: string) {
  const obj: Record<string, any> = {};
  str = (str || location.search).replace(/^[^]*\?/, '');
  sep = sep || '&';
  eq = eq || '=';
  let arr;
  const reg = new RegExp(
    '(?:^|\\' +
      sep +
      ')([^\\' +
      eq +
      '\\' +
      sep +
      ']+)(?:\\' +
      eq +
      '([^\\' +
      sep +
      ']*))?',
    'g'
  );
  while ((arr = reg.exec(str)) !== null) {
    if (arr[1] !== str) {
      obj[decodeURIComponent(arr[1])] = decodeURIComponent(arr[2] || '');
    }
  }
  return obj;
}

/**
 * 在url追加参数
 * @param {string} url 原本的url
 * @param {string|object} query 需要追加的参数，Object|String
 * @returns {string} 追加参数后的url
 */
export function append(url: string, query: string | Record<string, any>) {
  query = typeof query === 'string' ? parse(query) : query;
  const path = url.split('?')[0];
  const originalQuery = parse(url);
  const joinQuery = Object.assign({}, originalQuery, query);
  const queryStr = stringify(joinQuery);
  return queryStr ? [path, queryStr].join('?') : url;
}

export default {
  isUrl,
  getCurrentHost,
  getHost,
  stringify,
  parse,
  append
};
