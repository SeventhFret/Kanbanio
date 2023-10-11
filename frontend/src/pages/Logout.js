import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export function LogoutPage({ loggedIn }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(loggedIn);

        if (loggedIn) {
            localStorage.clear();
        }

        navigate("/", {loggedIn});
    // eslint-disable-next-line
    }, []);


}