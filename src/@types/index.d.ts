declare module '@emojifuck' {
  export type EmojifuckInterpreterProgram = string[];

  export interface EmojifuckInterpreterConstructor {
    config?: EmojifuckInterpreterConfig;
  }

  export interface EmojifuckInterpreter
    extends EmojifuckInterpreterConstructor {
    program: EmojifuckInterpreterProgram;
    state: EmojifuckInterpreterState;
    config: EmojifuckInterpreterConfig;
  }

  export interface EmojifuckInterpreterState {
    output: string;
    ipointer: number;
    mpointer: number;
    astack: number[];
    memory: number[];
  }

  export interface EmojifuckInterpreterConfig {
    size: number;
    alphabet: EmojifuckInterpreterAlphabet;
  }

  export interface EmojifuckInterpreterAlphabet {
    '>': string;
    '<': string;
    '+': string;
    '-': string;
    '.': string;
    ',': string;
    '[': string;
    ']': string;
  }
}
