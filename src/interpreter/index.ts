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

  public interpret(program: string) {
    this.reset(program);

    while (this.program[this.state.ipointer]) {
      this.interpretSymbol();
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

  private interpretSymbol() {
    switch (this.program[this.state.ipointer]) {
      case this.config.alphabet['>']: {
        this.handleNext();

        break;
      }

      case this.config.alphabet['<']:
        this.handlePrev();

        break;

      case this.config.alphabet['+']:
        this.handleAdd();

        break;

      case this.config.alphabet['-']:
        this.handleSub();

        break;

      case this.config.alphabet['.']:
        this.handleSet();

        break;

      case this.config.alphabet[',']:
        this.handleGet();

        break;

      case this.config.alphabet['[']:
        this.handleLoopStart();

        break;

      case this.config.alphabet[']']:
        this.handleLoopEnd();

        break;

      default:
        this.handleDefault();

        break;
    }

    this.next();
  }

  private next() {
    this.state.ipointer += 1;
  }

  private handleNext() {
    if (this.state.mpointer == this.state.memory.length - 1) {
      this.state.memory.push(0, 0, 0, 0, 0);
    }

    this.state.mpointer++;
  }

  private handlePrev() {
    if (this.state.mpointer > 0) {
      this.state.mpointer--;
    }
  }

  private handleAdd() {
    this.state.memory[this.state.mpointer]++;
  }

  private handleSub() {
    this.state.memory[this.state.mpointer]--;
  }

  private handleSet() {
    this.state.output += String.fromCharCode(
      this.state.memory[this.state.mpointer],
    );
  }

  private handleGet() {
    this.state.memory[this.state.mpointer] = 0;
  }

  private handleLoopStart() {
    if (this.state.memory[this.state.mpointer]) {
      // If non-zero
      this.state.astack.push(this.state.ipointer);
    } else {
      // Skip to matching right bracket
      let count = 0;

      while (true) {
        this.state.ipointer++;
        if (!this.program[this.state.ipointer]) break;

        if (this.program[this.state.ipointer] === '[') count++;
        else if (this.program[this.state.ipointer] === ']') {
          if (count) count--;
          else break;
        }
      }
    }
  }

  private handleLoopEnd() {
    //Pointer is automatically incremented every iteration, therefore we must decrement to get the correct value
    this.state.ipointer = this.state.astack.pop() - 1;
  }

  private handleDefault() {
    // We ignore any character that are not part of regular Brainfuck syntax
  }
}

export default EmojifuckInterpreterImpl;
