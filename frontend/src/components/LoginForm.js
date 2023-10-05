import Box from "@mui/material/Box";
import { useState } from "react";
import { whiteBlackTheme } from "./Themes";
import { Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { api } from "./ApiClient";
import { Link, useNavigate } from "react-router-dom";


export function LoginForm() {  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const submitUserData = (e) => {
        setLoading(true);
        e.preventDefault();
        
        api.post("/users/token/obtain/", {
            "username": username,
            "password": password
        })
        .then(resp => {
            if (resp) {
                setErrors([]);
                setLoading(false);
                localStorage.setItem("access", resp.data['access']);
                localStorage.setItem("refresh", resp.data['refresh']);
                navigate("/dashboard/");
            }
        })
        .catch(error => {
            if (error) {
                setLoading(false);
                setErrors(["Invalid username or password"]);
            console.log(error);
            }
        })
    } 

    const changeData = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;

        if (id === "username") {
            setUsername(value);
        } else if (id === "password") {
            setPassword(value);
        }
    }


    return (
            <form onSubmit={submitUserData}>
            { loading ? 
            <Box display='flex' 
                 justifyContent="center"
                 alignItems="center" 
                 flexDirection="column" 
                 sx={{ p: 5, 
                       borderRadius: '15px', 
                       backgroundColor: 'black', 
                       minWidth: "25vw", 
                       height: '311px' }}>
                <CircularProgress />
            </Box>

            :
            
            <Box display='flex' flexDirection="column" sx={{ p: 5, borderRadius: '15px', backgroundColor: 'black', minWidth: "25vw", gap: '2vh' }}>
                <h2 style={{ color: 'white' }}>Login</h2>
                <input className="text-input" id="username" type="text" onChange={changeData} placeholder="Username"></input>
                <input className="text-input" id="password" type="password" onChange={changeData} placeholder="Password"></input>

                <ThemeProvider theme={whiteBlackTheme}>
                    <Button variant="contained" type="submit">Login</Button>
                </ThemeProvider>

                <p>Don't have an account? <Link to="/register/" className="link">Create account</Link></p>

                { errors ? 
                errors.map((error, errInd) => (<Alert key={errInd} severity="error">{error}</Alert>))
                 : null }

            </Box>
            }
            </form>
    )
}