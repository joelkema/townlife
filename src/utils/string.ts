// Auto currying is not type-safe with TypeScript. The recommended solution is manual currying.
// https://github.com/gcanti/fp-ts/issues/640
export const match = (what: string | RegExp) => (s: string) => s.match(what);
export const replace = (search: string | RegExp) => (replace: string) => (s: string) =>
    s.replace(search, replace);
