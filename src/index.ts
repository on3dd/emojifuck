import { EmojifuckInterpreterConfig } from '@emojifuck';
import EmojifuckInterpreterImpl from './interpreter';

import { format } from './utils/functions';
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

console.log('original HELLO_WORLD', HELLO_WORLD);
console.log('formated HELLO_WORLD', format(HELLO_WORLD, config));

console.log('original FIBONACCI', FIBONACCI);
console.log('formated FIBONACCI', format(FIBONACCI, config));

const Interpreter = new EmojifuckInterpreterImpl({ config });

console.log(
  'HELLO_WORLD:',
  Interpreter.interpret(format(HELLO_WORLD, config)),
);

console.log(
  'FIBONACCI:',
  Interpreter.interpret(format(FIBONACCI, config)),
);
