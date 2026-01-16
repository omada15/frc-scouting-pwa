import { useEffect, useState } from "react";

function useIsMobile(MOBILE_BREAKPOINT = 768) {
    let isMobile = false;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
        isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    };

    mql.addEventListener("change", onChange);

    isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    mql.removeEventListener("change", onChange);
    

    return isMobile;
}
const isMobileDevice = useIsMobile();
export default isMobileDevice;
