import { EmojifuckInterpreterConfig } from '@emojifuck';

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
