// or :: (a -> Boolean) | Pred -> (a -> Boolean) | Pred -> a -> Boolean
const or =
    <A>(fn1: (x: A) => boolean, fn2: (x: A) => boolean) =>
    (x: A) =>
        fn1(x) || fn2(x);

export default or;
