export const getRandomOption = <T extends readonly string[]>(
    options: T,
  ): T[number] => {
    return options[Math.floor(Math.random() * options.length)];
  };