// scripts/debug.tsx
import { readCookie } from "./user";

export const getDebugStatus = (): boolean => {
    const user = readCookie("user");
    const rawWhiteList = import.meta.env.VITE_DEBUG || "";

    const whiteList = rawWhiteList.split(",").map((s: string) => s.trim());
    return user !== undefined && whiteList.includes(user);
};
