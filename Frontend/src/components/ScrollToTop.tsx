import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop : React.FC = () => {
    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathName]);
    return null;
}