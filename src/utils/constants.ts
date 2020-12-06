import {
  EmojifuckInterpreterProgram,
  EmojifuckInterpreterState,
  EmojifuckInterpreterConfig,
} from '@emojifuck';

export const DEFAULT_PROGRAM: EmojifuckInterpreterProgram = [];

export const DEFAULT_STATE: EmojifuckInterpreterState = {
  output: '',
  ipointer: 0,
  mpointer: 0,
  astack: [],
  memory: [],
};

export const DEFAULT_CONFIG: EmojifuckInterpreterConfig = {
  size: 30000,
  alphabet: {
    '>': '>',
    '<': '<',
    '+': '+',
    '-': '-',
    '.': '.',
    ',': ',',
    '[': '[',
    ']': ']',
  },
};

export const ALPHABET_LENGTH: number = Object.keys(
  DEFAULT_CONFIG.alphabet,
).length;
