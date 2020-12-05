import { EmojifuckInterpreterConfig } from '@emojifuck';

import EmojifuckFormatterImpl from './formatter';

import { HELLO_WORLD, FIBONACCI } from './utils/samples';

const config: EmojifuckInterpreterConfig = {
  size: 30000,
  alphabet: {
    '+': '😃',
    '-': '😨',
    ',': '😈',
    '.': '👿',
    '<': '👉🏻',
    '>': '👈🏻',
    '[': '💃',
    ']': '🕺',
  },
};

const formatter = new EmojifuckFormatterImpl({ config });

formatter.print(HELLO_WORLD);
formatter.print(FIBONACCI);
