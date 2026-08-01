import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        // Skip automatic scroll if navigation requested its own behavior
        if (location.state?.scrollTo) return;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", 
        });
    }, [location.pathname]);

    return null;
}

export default ScrollManager;