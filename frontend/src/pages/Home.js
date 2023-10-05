import "./Home.css";
import { Typography, ThemeProvider, Box } from "@mui/material";
import { NavBar } from "../components/UpperNavBar";
import { Button } from "@mui/material";
import { blackWhiteTheme } from "../components/Themes";
import { Link } from 'react-scroll';
import { Player } from "@lottiefiles/react-lottie-player";
import spinningBall from "../lotties/spinningBall.json";



export function Home({loggedIn}) {

    return (
        <>
            <NavBar loggedIn={loggedIn} />

            <div id="firstSection" className="section flex f-c">
                <Typography variant="h1">Welome to Kanbanio!</Typography>
                <ThemeProvider theme={blackWhiteTheme}>
                    <Link to="secondSection" spy={true} smooth={true} duration={800}>
                        <Button variant="contained" size="large" sx={{ mt: 5 }}>Get started</Button>
                    </Link>
                </ThemeProvider>
            </div>

            <div id="secondSection" className="section flex f-c">
                <Box display="flex" flexDirection="row" maxWidth="70%">
                    <Player
                    autoplay
                    loop
                    src={spinningBall}
                    style={{ height: '20vw', width: '20vw',  marginRight: '5vw' }}
                    />
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Typography variant="h2" sx={{ mb: 5 }}>Improve your productivity</Typography>
                        <Typography variant="h5" >
                            With our tool you always will be consentrating on important things
                            rather than on complexity of tools that you're using. 
                        </Typography>
                    </Box>
                </Box>
            </div>
        </>
    )
}