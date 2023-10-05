import Box from "@mui/material/Box";
import "./SignUpForm.css";
import { useState } from "react";
import { whiteBlackTheme } from "./Themes";
import { Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { api } from "./ApiClient";
import { Link } from "react-router-dom";


export function SignUpForm() {  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState([]);

    const submitUserData = (e) => {
        e.preventDefault();
        
        api.post("/users/create/", {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "username": username,
            "password": password
        })
        .then(resp => {
            if (resp.status === 201) {
                setMessages(resp.data['messages']); 
                setErrors([]);
            }
        })
        .catch(error => {
            if (error) {
                setErrors(error.response.data['errors']);
                setMessages([]);
            }
        })
    } 

    const changeData = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;

        if (id === "username") {
            setUsername(value);
        } else if (id === "email") {
            setEmail(value);
        } else if (id === "firstName") {
            setFirstName(value);
        } else if (id === "lastName") {
            setLastName(value);
        } else if (id === "password") {
            setPassword(value);
        }
    }

    return (
            <form onSubmit={submitUserData}>
            <Box display='flex' flexDirection="column" sx={{ p: 5, borderRadius: '15px', backgroundColor: 'black', minWidth: "25vw", gap: '2vh' }}>
                <h2 style={{ color: 'white' }}>Registration</h2>
                <input className="text-input" id="username" type="text" onChange={changeData} placeholder="Username"></input>
                <input className="text-input" id="firstName" type="text" onChange={changeData} placeholder="First name"></input>
                <input className="text-input" id="lastName" type="text" onChange={changeData} placeholder="Last name"></input>
                <input className="text-input" id="email" type="text" onChange={changeData} placeholder="Email"></input>
                <input className="text-input" id="password" type="password" onChange={changeData} placeholder="Password"></input>

                <ThemeProvider theme={whiteBlackTheme}>
                    <Button variant="contained" type="submit">Create account</Button>
                </ThemeProvider>

                <p>Already have an account? <Link to="/login/" className="link">Login</Link></p>

                { errors ? 
                errors.map((error, errInd) => (<Alert key={errInd} severity="error">{error}</Alert>))
                 : null }

                { messages ? messages.map((message, mesInd) => (<Alert key={mesInd}>{message}</Alert>)) : null }

            </Box>
            </form>
    )
}