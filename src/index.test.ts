import { EmojifuckInterpreterConfig } from '@emojifuck';

import EmojifuckFormatterImpl from './formatter';
import EmojifuckInterpreterImpl from './interpreter';

import { validate } from './utils/functions';
import { HELLO_WORLD, FIBONACCI } from './utils/samples';

const DEFAULT_CONFIG: EmojifuckInterpreterConfig = {
  size: 30000,
  alphabet: {
    '+': '😃',
    '-': '😨',
    ',': '😈',
    '.': '👿',
    '<': '👈',
    '>': '👉',
    '[': '💃',
    ']': '🕺',
  },
};

const formatter = new EmojifuckFormatterImpl({
  config: DEFAULT_CONFIG,
});

const interpreter = new EmojifuckInterpreterImpl({
  config: DEFAULT_CONFIG,
});

describe('Validator tests', () => {
  test('config.size is undefined', () => {
    expect(() => {
      validate(
        Object.assign({}, DEFAULT_CONFIG, { size: undefined }),
      );
    }).toThrowError();
  });

  test('config.size is zero', () => {
    expect(() => {
      validate(Object.assign({}, DEFAULT_CONFIG, { size: 0 }));
    }).toThrowError();
  });

  test('config.alphabet is undefined', () => {
    expect(() => {
      validate(
        Object.assign({}, DEFAULT_CONFIG, { alphabet: undefined }),
      );
    }).toThrowError();
  });

  test('config.alphabet is shorter than expected length', () => {
    expect(() => {
      validate(
        Object.assign({}, DEFAULT_CONFIG, {
          alphabet: { '+': '😃' },
        }),
      );
    }).toThrowError();
  });

  test('config.alphabet is missing a value for a specific key', () => {
    expect(() => {
      validate(
        Object.assign({}, DEFAULT_CONFIG, {
          alphabet: {
            '+': '',
            '-': '😨',
            ',': '😈',
            '.': '👿',
            '<': '👈',
            '>': '👉',
            '[': '💃',
            ']': '🕺',
          },
        }),
      );
    }).toThrowError();
  });

  test('config.alphabet contains duplicate values', () => {
    expect(() => {
      validate(
        Object.assign({}, DEFAULT_CONFIG, {
          alphabet: {
            '+': '😨',
            '-': '😨',
            ',': '😈',
            '.': '👿',
            '<': '👈',
            '>': '👉',
            '[': '💃',
            ']': '🕺',
          },
        }),
      );
    }).toThrowError();
  });
});

describe('Interpreter tests', () => {
  test('hello world', () => {
    const formatted = formatter.format(HELLO_WORLD.code);

    const result = interpreter.interpret(formatted);

    expect(result).toMatch(/Hello World!/);
  });

  test('fibonacci', () => {
    const formatted = formatter.format(FIBONACCI.code);

    const result = interpreter.interpret(formatted);

    expect(result).toMatch(/1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89/);
  });
});
