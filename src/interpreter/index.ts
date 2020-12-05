import GraphemeSplitter from 'grapheme-splitter';

import {
  EmojifuckInterpreter,
  EmojifuckInterpreterState,
  EmojifuckInterpreterConfig,
  EmojifuckInterpreterConstructor,
  EmojifuckInterpreterAlphabet,
} from '@emojifuck';

import {
  DEFAULT_PROGRAM,
  DEFAULT_STATE,
  DEFAULT_CONFIG,
} from '../utils/constants';

class EmojifuckInterpreterImpl implements EmojifuckInterpreter {
  private splitter: GraphemeSplitter;

  public program: string[] = DEFAULT_PROGRAM;
  public state: EmojifuckInterpreterState = DEFAULT_STATE;
  public config: EmojifuckInterpreterConfig = DEFAULT_CONFIG;

  constructor({ config }: EmojifuckInterpreterConstructor) {
    this.config = config || this.config;

    this.splitter = new GraphemeSplitter();
  }

  private get current() {
    return this.program[this.state.ipointer];
  }

  public interpret(program: string) {
    this.reset(program);

    while (this.current) {
      // console.log('----------------------');
      // console.log('current', this.current);

      this.interpretSymbol(this.current);
      this.movePointerForward();
    }

    return this.state.output;
  }

  private reset(program: string) {
    this.program = this.splitter.splitGraphemes(program);

    // console.log('this.program', this.program.join());

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
      case this.alphabetSymbol('>'):
        return this.handleNext();

      case this.alphabetSymbol('<'):
        return this.handlePrev();

      case this.alphabetSymbol('+'):
        return this.handleAdd();

      case this.alphabetSymbol('-'):
        return this.handleSub();

      case this.alphabetSymbol('.'):
        return this.handleSet();

      case this.alphabetSymbol(','):
        return this.handleGet();

      case this.alphabetSymbol('['):
        return this.handleLoopStart();

      case this.alphabetSymbol(']'):
        return this.handleLoopEnd();

      default:
        return this.handleDefault();
    }
  }

  private alphabetSymbol(key: keyof EmojifuckInterpreterAlphabet) {
    return this.config.alphabet[key];
  }

  private movePointerForward() {
    return (this.state.ipointer += 1);
  }

  private handleNext() {
    // console.log(this.handleNext.name);

    if (this.state.mpointer == this.state.memory.length - 1) {
      this.state.memory.push(0, 0, 0, 0, 0);
    }

    return (this.state.mpointer += 1);
  }

  private handlePrev() {
    // console.log(this.handlePrev.name);

    if (this.state.mpointer > 0) {
      this.state.mpointer -= 1;
    }

    return this.state.mpointer;
  }

  private handleAdd() {
    // console.log(this.handleAdd.name);

    return (this.state.memory[this.state.mpointer] += 1);
  }

  private handleSub() {
    // console.log(this.handleSub.name);

    return (this.state.memory[this.state.mpointer] -= 1);
  }

  private handleSet() {
    // console.log(this.handleSet.name);

    return (this.state.output += String.fromCharCode(
      this.state.memory[this.state.mpointer],
    ));
  }

  private handleGet() {
    // console.log(this.handleGet.name);

    return (this.state.memory[this.state.mpointer] = 0);
  }

  private handleLoopStart() {
    // console.log(this.handleLoopStart.name);

    if (this.state.memory[this.state.mpointer]) {
      return this.state.astack.push(this.state.ipointer);
    }

    let count = 0;

    do {
      this.state.ipointer += 1;

      switch (this.current) {
        case this.alphabetSymbol('['): {
          count += 1;
          break;
        }

        case this.alphabetSymbol(']'): {
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
    // console.log(this.handleLoopEnd.name);

    this.state.ipointer = this.state.astack.pop() - 1;
  }

  private handleDefault() {
    if (!this.current) return;

    // console.log(this.handleDefault.name);
  }
}

export default EmojifuckInterpreterImpl;
