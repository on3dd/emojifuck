import {
  EmojifuckFormatter,
  EmojifuckInterpreterConfig,
  EmojifuckFormatterConstructor,
  EmojifuckSampleProgram,
} from '@emojifuck';

import EmojifuckInterpreterImpl from '../interpreter';

import { DEFAULT_CONFIG } from '../utils/constants';

class EmojifuckFormatterImlp implements EmojifuckFormatter {
  public interpreter: EmojifuckInterpreterImpl;
  public config: EmojifuckInterpreterConfig = DEFAULT_CONFIG;

  constructor({ config }: EmojifuckFormatterConstructor) {
    this.config = config || this.config;

    this.interpreter = new EmojifuckInterpreterImpl({
      config: this.config,
    });
  }

  public format = (program: string): string => {
    return Object.entries(this.config.alphabet).reduce(
      (prev, curr) => {
        const regex = new RegExp(`\\${curr[0]}`, 'g');
        return prev.replace(regex, curr[1]);
      },
      program,
    );
  };

  public print = (sample: EmojifuckSampleProgram): void => {
    console.log(`original ${sample.name}: ${sample.code}`);

    const formatted = this.format(sample.code);
    console.log(`formated ${sample.name}: ${formatted}`);

    const interpreted = this.interpreter.interpret(formatted);
    console.log(`interpreted ${sample.name}: ${interpreted}`);
  };
}

export default EmojifuckFormatterImlp;
