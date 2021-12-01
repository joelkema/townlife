import { PredOrFn, predOrFn } from "../../predicates";

// and :: ((a -> Boolean) | Pred a) -> ((a -> Boolean) | Pred a) -> a -> Boolean
// see: https://crocks.dev/docs/functions/logic-functions.html
const and =
    <A>(f: PredOrFn<A>, g: PredOrFn<A>) =>
    (x: A) =>
        predOrFn(f, x) && predOrFn(g, x);

export default and;
