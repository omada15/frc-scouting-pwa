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
        // We only check if it is active.
        // We don't care if seconds > 0 anymore.
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setSeconds((v) => v + 1); // Incrementing instead of decrementing
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        // Cleanup on unmount or when isActive changes
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]); // Only depend on isActive now

    return { seconds, isActive, start, pause, reset };
};
