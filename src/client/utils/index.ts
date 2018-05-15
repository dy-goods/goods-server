export const bindMethod = <T>(t: T, keys: (keyof T)[]): T => {
  keys.forEach(k => {
    const value = t[k];
    if (typeof value === 'function') {
      // tslint:disable-next-line:no-any
      t[k] = (value as any).bind(t);
    }
  });
  return t;
};
