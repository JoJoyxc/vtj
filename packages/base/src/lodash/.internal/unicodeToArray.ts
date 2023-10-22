/** Used to compose unicode character classes. */
export const rsAstralRange = '\\ud800-\\udfff';
export const rsComboMarksRange = '\\u0300-\\u036f';
export const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
export const rsComboSymbolsRange = '\\u20d0-\\u20ff';
export const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff';
export const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff';
export const rsComboRange =
  rsComboMarksRange +
  reComboHalfMarksRange +
  rsComboSymbolsRange +
  rsComboMarksExtendedRange +
  rsComboMarksSupplementRange;


export const rsVarRange = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */
export const rsAstral = `[${rsAstralRange}]`;
export const rsCombo = `[${rsComboRange}]`;
export const rsFitz = '\\ud83c[\\udffb-\\udfff]';
export const rsModifier = `(?:${rsCombo}|${rsFitz})`;
export const rsNonAstral = `[^${rsAstralRange}]`;
export const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
export const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
export const rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
export const reOptMod = `${rsModifier}?`;
export const rsOptVar = `[${rsVarRange}]?`;
export const rsOptJoin = `(?:${rsZWJ}(?:${[
  rsNonAstral,
  rsRegional,
  rsSurrPair
].join('|')})${rsOptVar + reOptMod})*`;
export const rsSeq = rsOptVar + reOptMod + rsOptJoin;
export const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`;
export const rsSymbol = `(?:${[
  rsNonAstralCombo,
  rsCombo,
  rsRegional,
  rsSurrPair,
  rsAstral
].join('|')})`;

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
export const reUnicode = RegExp(
  `${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`,
  'g'
);

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
export default function unicodeToArray(string: string) {
  return string.match(reUnicode) || [];
}
