/** not :: (a -> Boolean) | Pred -> a -> Boolean */
const not =
    <A>(f: (a: A) => boolean) =>
    (x: A) =>
        !f(x);

export default not;
