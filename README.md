# Emojifuck 🎅 ❄️ 🎁 🦌 ⛄ 👪 🎄
🧠🤬 Brainfuck, but in emoji. Fuck your brain with custom emoji commands and TypeScript (in progress)

## Things to be done ✔️
- [x] Create the interpreter itsefl
- [ ] Create a validator for configs
- [ ] Write some tests for both of them

## Project setup 🔧
### 1. Install dependencies

```
npm install
```

### 2. [Optional] Create your own program
src/index.ts OR src/utils/samples.ts

```typescript
...

export const HELLO_WORLD: EmojifuckSampleProgram = {
  /* Name of the program, will be used in the formatter */
  name: 'HELLO_WORLD',
  /* Code of the program, will be used in the interpreter */
  code: `
    ++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++
    .>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.
    ------.--------.>+.>.
  `,
};

...
```

### 3. [Optional] Change config values
src/index.ts

```typescript
...

const config: EmojifuckInterpreterConfig = {
  /* Number of available memory locations for the interpreter */
  size: 30000,
  /* Alphabet for the interpreter; your bf code will be updated with these symbols */ 
  alphabet: { 
    '+': '😃',
    '-': '😨',
    ',': '😈',
    '.': '👿',
    '<': '👉🏻',
    '>': '👈🏻',
    '[': '💃',
    ']': '🕺',
  },
};

...
```

### 4. Run the interpreter

```
npm run start
```

### 5. [Optional] Runs tests

```
npm run test
```
