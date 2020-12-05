import {
  EmojifuckFormatter,
  EmojifuckInterpreterConfig,
  EmojifuckFormatterConstructor,
  EmojifuckSampleProgram,
} from '@emojifuck';

import EmojifuckInterpreterImpl from '../interpreter';

import { format } from '../utils/functions';
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

  public print(sample: EmojifuckSampleProgram) {
    console.log(`original ${sample.name}: ${sample.code}`);

    const formatted = format(sample.code, this.config);
    console.log(`formated ${sample.name}: ${formatted}`);

    const interpreted = this.interpreter.interpret(formatted);
    console.log(`interpreted ${sample.name}: ${interpreted}`);
  }
}

export default EmojifuckFormatterImlp;
