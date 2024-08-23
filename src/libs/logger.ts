const info = (...params: unknown[]): void => console.log(...params);

const error = (...params: unknown[]): void => console.error(...params);

export default { info, error };
