import { EmojifuckInterpreterConfig } from '@emojifuck';

import { ALPHABET_LENGTH } from './constants';

export const validate = (
  config: EmojifuckInterpreterConfig,
): EmojifuckInterpreterConfig => {
  if (!config.size)
    throw new Error(
      'Validation error: config.size must be provided!',
    );

  if (!config.alphabet)
    throw new Error(
      'Validation error: config.alphabet must be prodivev!',
    );

  if (Object.keys(config.alphabet).length !== ALPHABET_LENGTH)
    throw new Error(
      `Validation error: config.alphabet must contain ${ALPHABET_LENGTH} symbols!`,
    );

  Object.entries(config.alphabet).reduce((prev, [key, value]) => {
    if (!value)
      throw new Error(
        `Validation error: value for key "${key}" in config.alphabet was not provided!`,
      );

    if (prev.includes(value))
      throw new Error(
        `Validation error: key "${key}" contains a duplicate value "${value}" in config.alphabet!`,
      );

    return [...prev, value];
  }, []);

  return config;
};

export const format = (
  program: string,
  { alphabet }: EmojifuckInterpreterConfig,
) => {
  return Object.entries(alphabet).reduce((prev, curr) => {
    const regex = new RegExp(`\\${curr[0]}`, 'g');
    return prev.replace(regex, curr[1]);
  }, program);
};
