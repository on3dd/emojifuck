import EmojifuckInterpreterImpl from './interpreter';
import { HELLO_WORLD, FIBONACCI } from './utils/samples';

const Interpreter = new EmojifuckInterpreterImpl({});

console.log('Hello world:', Interpreter.interpret(HELLO_WORLD));
console.log('Fibonacci:', Interpreter.interpret(FIBONACCI));
