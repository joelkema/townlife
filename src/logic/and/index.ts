// and :: ((a -> Boolean) | Pred a) -> ((a -> Boolean) | Pred a) -> a -> Boolean
// see: https://crocks.dev/docs/functions/logic-functions.html
const and =
    <A>(f: (a: A) => boolean, g: (a: A) => boolean) =>
    (x: A) =>
        f(x) && g(x);

export default and;
