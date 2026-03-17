import { useState, useEffect, useRef } from "react";

export const useTimer = (initialSeconds: number = 0) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => setIsActive(true);
    const pause = () => setIsActive(false);
    const reset = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setSeconds((v) => v + 1); // Incrementing instead of decrementing
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    return { seconds, isActive, start, pause, reset };
};
