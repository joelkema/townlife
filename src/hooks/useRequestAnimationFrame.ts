import { useCallback, useEffect, useRef } from "react";

const useRequestAnimationFrame = (
    callback: (time: DOMHighResTimeStamp, elapsed: number) => any,
) => {
    const requestRef = useRef<DOMHighResTimeStamp>();
    const previousTimeRef = useRef<DOMHighResTimeStamp>();

    const animate = useCallback(
        (timestamp: DOMHighResTimeStamp) => {
            if (previousTimeRef.current) callback(timestamp, timestamp - previousTimeRef.current);

            previousTimeRef.current = timestamp;
            requestRef.current = requestAnimationFrame(animate);
        },
        [callback],
    );

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [animate]);
};

export default useRequestAnimationFrame;
