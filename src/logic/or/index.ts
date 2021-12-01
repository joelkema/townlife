import { PredOrFn, predOrFn } from "../../predicates";

export const or =
    <A>(f: PredOrFn<A>, g: PredOrFn<A>) =>
    (x: A) =>
        predOrFn(f, x) || predOrFn(g, x);

export default or;
