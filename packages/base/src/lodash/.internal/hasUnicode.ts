/** Used to compose unicode character classes. */

import {
  rsAstralRange,
  rsComboRange,
  rsVarRange,
  rsZWJ
} from './unicodeToArray';

// export const rsAstralRange = '\\ud800-\\udfff';
// export const rsComboMarksRange = '\\u0300-\\u036f';
// export const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
// export const rsComboSymbolsRange = '\\u20d0-\\u20ff';
// export const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff';
// export const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff';
// export const rsComboRange =
//   rsComboMarksRange +
//   reComboHalfMarksRange +
//   rsComboSymbolsRange +
//   rsComboMarksExtendedRange +
//   rsComboMarksSupplementRange;
// export const rsVarRange = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */

// export const rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

export const reHasUnicode = RegExp(
  `[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`
);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */

export default function hasUnicode(string: string) {
  return reHasUnicode.test(string);
}
