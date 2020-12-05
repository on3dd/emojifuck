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
