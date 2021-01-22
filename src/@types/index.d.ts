declare module '@emojifuck' {
  export type EmojifuckInterpreterProgram = string[];

  export interface EmojifuckSampleProgram {
    name: string;
    code: string;
  }

  export interface EmojifuckInterpreterConstructor {
    config?: EmojifuckInterpreterConfig;
  }

  export interface EmojifuckInterpreter
    extends EmojifuckInterpreterConstructor {
    program: EmojifuckInterpreterProgram;
    state: EmojifuckInterpreterState;
    config: EmojifuckInterpreterConfig;

    interpret: (code: string) => string;
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

  export interface EmojifuckFormatterConstructor {
    config?: EmojifuckInterpreterConfig;
  }

  export interface EmojifuckFormatter
    extends EmojifuckFormatterConstructor {
    config: EmojifuckInterpreterConfig;
    interpreter: EmojifuckInterpreter;

    format: (program: string) => string;
    print: (code: EmojifuckSampleProgram) => void;
  }
}
