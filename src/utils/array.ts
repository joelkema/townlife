import { compose } from "../logic";

export const filter: <A>(f: (value: A, index: number, arr: A[]) => A) => (fa: A[]) => A[] =
    (f) => (fa) =>
        fa.filter(f);

export const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> =
    (f) => (fa) =>
        fa.map((a) => f(a));

export const reduce: <A>(
    f: (previousValue: A, currentValue: A, currentIndex: number, array: A[]) => A,
    initialValue?: A,
) => (fa: A[]) => A = (f) => (fa) => fa.reduce(f);

export const reverse = <A>(arr: A[]) => arr.reverse();
export const head = <A>(arr: A[]) => arr[0];
export const last = compose(head, reverse);

// export const average = <A>(arr: A[]) => reduce(add, 0, arr) / arr.length;
