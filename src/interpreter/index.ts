interface EmojifuckInterpreterConstructor {
  config?: EmojifuckInterpreterConfig;
}

interface EmojifuckInterpreter
  extends EmojifuckInterpreterConstructor {
  state: EmojifuckInterpreterState;
  config: EmojifuckInterpreterConfig;
}

interface EmojifuckInterpreterState {
  ipointer: number;
  mpointer: number;
  astack: number[];
  memory: number[];
}

interface EmojifuckInterpreterConfig {
  size?: number;
  alphabet?: {
    '>': string;
    '<': string;
    '+': string;
    '-': string;
    '.': string;
    ',': string;
    '[': string;
    ']': string;
  };
}

class EmojifuckInterpreterImpl implements EmojifuckInterpreter {
  public program: string = '';

  public state: EmojifuckInterpreterState = {
    ipointer: 0,
    mpointer: 0,
    astack: [],
    memory: [],
  };

  public config: EmojifuckInterpreterConfig = {
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

  constructor(props: EmojifuckInterpreterConstructor) {
    this.config = props.config ?? this.config;
  }

  public reset() {
    this.state = {
      ipointer: 0,
      mpointer: 0,
      astack: new Array<number>(),
      memory: new Array<number>(this.config.size).fill(0),
    };
  }

  public interpret(program: string) {
    this.reset();

    let output = '';

    while (program[this.state.ipointer]) {
      switch (program[this.state.ipointer]) {
        case this.config.alphabet['>']: {
          if (this.state.mpointer == this.state.memory.length - 1) {
            this.state.memory.push(0, 0, 0, 0, 0);
          }

          this.state.mpointer++;

          break;
        }

        case this.config.alphabet['<']:
          if (this.state.mpointer > 0) {
            this.state.mpointer--;
          }

          break;

        case this.config.alphabet['+']:
          this.state.memory[this.state.mpointer]++;

          break;

        case this.config.alphabet['-']:
          this.state.memory[this.state.mpointer]--;

          break;

        case this.config.alphabet['.']:
          output += String.fromCharCode(
            this.state.memory[this.state.mpointer],
          );

          break;

        case this.config.alphabet[',']:
          this.state.memory[this.state.mpointer] = 0;

          break;

        case this.config.alphabet['[']:
          if (this.state.memory[this.state.mpointer]) {
            // If non-zero
            this.state.astack.push(this.state.ipointer);
          } else {
            // Skip to matching right bracket
            let count = 0;

            while (true) {
              this.state.ipointer++;
              if (!program[this.state.ipointer]) break;

              if (program[this.state.ipointer] === '[') count++;
              else if (program[this.state.ipointer] === ']') {
                if (count) count--;
                else break;
              }
            }
          }
          break;

        case this.config.alphabet[']']:
          //Pointer is automatically incremented every iteration, therefore we must decrement to get the correct value
          this.state.ipointer = this.state.astack.pop() - 1;
          break;

        default:
          // We ignore any character that are not part of regular Brainfuck syntax
          break;
      }

      this.state.ipointer += 1;
    }

    return output;
  }
}

export default EmojifuckInterpreterImpl;
