import {
  EmojifuckInterpreter,
  EmojifuckInterpreterState,
  EmojifuckInterpreterConfig,
  EmojifuckInterpreterConstructor,
} from '@emojifuck';

class EmojifuckInterpreterImpl implements EmojifuckInterpreter {
  public program: string = '';

  public state: EmojifuckInterpreterState = {
    output: '',
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

  private get current() {
    return this.program[this.state.ipointer];
  }

  public interpret(program: string) {
    this.reset(program);

    while (this.current) {
      this.interpretSymbol(this.current);
      this.movePointerForward();
    }

    return this.state.output;
  }

  private reset(program: string) {
    this.program = program;

    this.state = {
      output: '',
      ipointer: 0,
      mpointer: 0,
      astack: new Array<number>(),
      memory: new Array<number>(this.config.size).fill(0),
    };
  }

  private interpretSymbol(symbol: string) {
    switch (symbol) {
      case this.config.alphabet['>']:
        return this.handleNext();

      case this.config.alphabet['<']:
        return this.handlePrev();

      case this.config.alphabet['+']:
        return this.handleAdd();

      case this.config.alphabet['-']:
        return this.handleSub();

      case this.config.alphabet['.']:
        return this.handleSet();

      case this.config.alphabet[',']:
        return this.handleGet();

      case this.config.alphabet['[']:
        return this.handleLoopStart();

      case this.config.alphabet[']']:
        return this.handleLoopEnd();

      default:
        return this.handleDefault();
    }
  }

  private movePointerForward() {
    return (this.state.ipointer += 1);
  }

  private handleNext() {
    if (this.state.mpointer == this.state.memory.length - 1) {
      this.state.memory.push(0, 0, 0, 0, 0);
    }

    return (this.state.mpointer += 1);
  }

  private handlePrev() {
    if (this.state.mpointer > 0) {
      this.state.mpointer -= 1;
    }

    return this.state.mpointer;
  }

  private handleAdd() {
    return (this.state.memory[this.state.mpointer] += 1);
  }

  private handleSub() {
    return (this.state.memory[this.state.mpointer] -= 1);
  }

  private handleSet() {
    return (this.state.output += String.fromCharCode(
      this.state.memory[this.state.mpointer],
    ));
  }

  private handleGet() {
    return (this.state.memory[this.state.mpointer] = 0);
  }

  private handleLoopStart() {
    if (this.state.memory[this.state.mpointer]) {
      return this.state.astack.push(this.state.ipointer);
    }

    let count = 0;

    do {
      this.state.ipointer += 1;

      switch (this.current) {
        case this.config.alphabet['[']: {
          count += 1;
          break;
        }

        case this.config.alphabet[']']: {
          if (count === 0) {
            return;
          }

          count -= 1;
          break;
        }

        default: {
          break;
        }
      }
    } while (this.current);
  }

  private handleLoopEnd() {
    this.state.ipointer = this.state.astack.pop() - 1;
  }

  private handleDefault() {
    return;
  }
}

export default EmojifuckInterpreterImpl;
