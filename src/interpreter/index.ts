import GraphemeSplitter from 'grapheme-splitter';

import {
  EmojifuckInterpreter,
  EmojifuckInterpreterState,
  EmojifuckInterpreterConfig,
  EmojifuckInterpreterConstructor,
  EmojifuckInterpreterProgram,
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
      this.interpretSymbol(this.current);
      this.movePointerForward();
    }

    return this.state.output;
  }

  private reset(program: string) {
    this.program = this.splitter.splitGraphemes(program);

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
    this.state.ipointer = this.state.astack.pop() - 1;
  }

  private handleDefault() {
    if (!this.current) return;
  }
}

export default EmojifuckInterpreterImpl;
