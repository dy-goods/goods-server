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

export const priceText = (s?: number | string, prefix?: string) => {
  s = Number(s);
  if (typeof prefix === 'undefined') {
    prefix = '￥';
  }
  if (isNaN(s)) {
    return `${prefix}0`;
  }
  let num = (s / 100).toFixed(2);
  while (true) {
    if (num.endsWith('0')) {
      num = num.slice(0, -1);
      continue;
    }
    if (num.endsWith('.')) {
      num = num.slice(0, -1);
    }
    break;
  }
  return `${prefix}${num}`;
};
