import { EmojifuckInterpreterConfig } from '@emojifuck';

export const format = (
  program: string,
  { alphabet }: EmojifuckInterpreterConfig,
) => {
  return Object.entries(alphabet).reduce((prev, curr) => {
    const regex = new RegExp(`\\${curr[0]}`, 'g');
    return prev.replace(regex, curr[1]);
  }, program);
};

export const emojiToUnicode = (str: string) => {
  const a = (str: string) => str.codePointAt(0).toString(16);
  const b = (str: string) =>
    str.codePointAt(0).toString(16) +
    '-' +
    str.codePointAt(2).toString(16);

  return str.length < 4 ? a(str) : b(str);
};

// export const emojiToUnicode = (emoji: string) => {
//   return emoji.codePointAt(0).toString(16);
// };

export const unicodeToEmoji = (code: string) => {
  return String.fromCodePoint(Number('0x' + code));
};
