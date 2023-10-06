import { useNavigate } from "react-router-dom";


export function LogoutPage({ loggedIn }) {
    const naviagate = useNavigate();
    if (loggedIn) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    } 
    naviagate("/");

    

}