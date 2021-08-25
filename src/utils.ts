const numberRE = /[0-9]/;

export const isNumber = (val: string): boolean => numberRE.test(val);
export const isPaste = (e: KeyboardEvent): boolean =>
  e.code === 'KeyV' && (e.ctrlKey || e.metaKey);

/**
 * returns value, if it is between a and b.
 * otherwise, returns the number it's gone past.
 */
export const clamp = (value: number, min: number, max: number): number =>
  min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value;
