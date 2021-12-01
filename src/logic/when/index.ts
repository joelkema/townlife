import { PredOrFn, predOrFn } from "../../predicates";

// when :: ((a -> Boolean) | Pred) -> (a -> a) -> a -> a
// see: https://crocks.dev/docs/functions/logic-functions.html
const when =
    <A, B>(pred: PredOrFn<A>, then: (x: A) => B) =>
    (x: A) =>
        predOrFn<A>(pred, x) ? then(x) : x;

export default when;
