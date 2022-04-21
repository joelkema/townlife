// when :: ((a -> Boolean) | Pred) -> (a -> a) -> a -> a
// see: https://crocks.dev/docs/functions/logic-functions.html
const when =
    <A, B>(pred: (a: A) => boolean, then: (x: A) => B) =>
    (x: A) =>
        pred(x) ? then(x) : x;

export default when;
