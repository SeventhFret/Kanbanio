import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function LogoutPage({ loggedIn }) {
    const navigate = useNavigate();
    
    useEffect(() => {

        if (loggedIn) {
            localStorage.clear();
        }

        navigate("/", {loggedIn});
    // eslint-disable-next-line
    }, []);


}