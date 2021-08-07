export declare const isNumber: (val: string) => boolean;
export declare const isPaste: (e: KeyboardEvent) => boolean;
/**
 * returns value, if it is between a and b.
 * otherwise, returns the number it's gone past.
 */
export declare const clamp: (value: number, min: number, max: number) => number;
