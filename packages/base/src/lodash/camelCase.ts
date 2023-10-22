import { upperFirst } from './upperFirst';
import { words } from './words';
import { toString } from './toString';

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
export const camelCase = (string: string) =>
  words(toString(string).replace(/['\u2019]/g, '')).reduce(
    (result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? upperFirst(word) : word);
    },
    ''
  );
