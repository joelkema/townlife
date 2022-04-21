import { or } from "../logic";

export type PredOrFn<T> = boolean | ((x: T) => boolean);

/* Note: This is an naive implementation. Idealy you want it to be a monoidal contravariant datatype.
 * https://crocks.dev/docs/crocks/Pred.html
 */
export const predOrFn = <T>(pred: PredOrFn<T>, x: T) => (isBoolean(pred) ? pred : pred(x));

/** isBoolean :: a -> Boolean */
export const isBoolean = (a: any): a is boolean => "boolean" === typeof a;

/** isArray :: a -> Boolean */
export const isArray = (a: any): a is any[] => Array.isArray(a);

/** isNumber :: a -> Boolean */
export const isNumber = (a: any): a is number => typeof a === "number" && !isNaN(a);

/** isNil :: a -> Boolean */
export const isNil = (a: any) => a == null;

// isLessThan :: Number -> Number -> Boolean
export const isLessThan = (x: number) => (y: number) => y < x;

// isLessThan :: Number -> Number -> Boolean
export const isLessThanEquals = (x: number) => (y: number) => y <= x;

// isGreaterThan :: Number -> Number -> Boolean
export const isGreaterThan = (x: number) => (y: number) => y > x;

// isGreaterThanEquals :: Number -> Number -> Boolean
export const isGreaterThanEquals = (x: number) => (y: number) => y >= x;

export const isNegative = isLessThan(0);

export const isPositive = isGreaterThan(0);

export const isEven = (x: number) => x % 2 === 0;

export const nonZero = or(isNegative, isPositive);

export const some =
    <T>(predicate: (value: T, index: number, array: T[]) => unknown) =>
    (array: T[]) =>
        array.some(predicate);
