# Emojifuck 🎅 ❄️ 🎁 🦌 ⛄ 👪 🎄
🧠🤬 Brainfuck, but in emoji. Fuck your brain with custom emoji commands, TypeScript and Docker!

## Things to be done ✔️
- [x] Create the interpreter itsefl
- [x] Create a validator for configs
- [x] Write some tests for both of them 
- [x] Dockerize and publish final app

## Project setup (via npm) 🔧
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
    '<': '👈',
    '>': '👉',
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

## Project setup (via Docker) 🐋
### 1. Install Docker
https://docs.docker.com/get-docker/

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
    '<': '👈',
    '>': '👉',
    '[': '💃',
    ']': '🕺',
  },
};

...
```

### 4. Run the interpreter
#### 4.1. Build image

```
docker build -t emojifuck -f Dockerfile .
```
#### 4.2. Run container

```
docker run emojifuck
```

### 5. [Optional] Runs tests
#### 5.1. Build image

```
docker build -t emojifuck-test -f Dockerfile.test .
```
#### 5.2. Run container

```
docker run --rm emojifuck-test
```

