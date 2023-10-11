import "./Home.css";
import { useEffect, useState } from "react";
import notesDemo from '../images/notes-demo.png';
import todosDemo from '../images/todos-demo.png';
import spinningBall from "../lotties/spinningBall.json";
import { Typography, ThemeProvider, Box } from "@mui/material";
import { NavBar } from "../components/UpperNavBar";
import { Button } from "@mui/material";
import { blackWhiteTheme } from "../components/Themes";
import { animateScroll } from 'react-scroll';
import { motion } from 'framer-motion';
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";



export function Home({loggedIn}) {
    const [animateProp, setAnimateProp] = useState({});
    const [displayHeader, setDisplayHeader] = useState(true);
    const [hideFirstSection, setHideFirstSection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            document.body.style.overflow = 'hidden';
        }
    }, [loggedIn])
    
    const handleStartButton = () => {
        setAnimateProp({ width: "100vw", height: "100vh", marginTop: '-2vh' });
        setDisplayHeader(false);
    }

    const animationFinished = () => {
        animateScroll.scrollTo(1000, {smooth: true, duration: 1000, delay: 100});
        setTimeout(() => {
            setHideFirstSection(true);
            document.body.style.overflow = 'auto';
        }, 1100);
    } 

    return (
        <>
            { hideFirstSection || loggedIn ? <NavBar loggedIn={loggedIn} /> : null }

            <div id="firstSection" className="section flex f-c">
                { (displayHeader || hideFirstSection) ? 
                    <Typography variant="h1" sx={{ color: 'black' }}>Welome to Kanbanio!</Typography>
                : null }

                { hideFirstSection ? null :
                <ThemeProvider theme={blackWhiteTheme}>
                    <Button 
                     variant="contained" 
                     size="large"
                     onClick={loggedIn ? () => {navigate("/dashboard/")} : handleStartButton}
                     sx={{ mt: 5 }}>{displayHeader ? "Get started" : ''}
                        <motion.div
                        initial={{ width: 0, height: 0 }}
                        animate={animateProp}
                        transition={{ duration: 1, type: 'spring' }}
                        onAnimationComplete={animationFinished}
                        >
                        </motion.div>
                    </Button>
                </ThemeProvider>
                }
            </div>

            <div id="secondSection" className="section flex f-c">
                <Box display="flex" flexDirection="row" maxWidth="70%">
                    <Player
                    autoplay
                    loop
                    src={spinningBall}
                    style={{ height: '20vw', width: '20vw',  marginRight: '5vw' }}
                    />
                    <Box display="flex" flexDirection="column" justifyContent="center" sx={{ color: 'black' }}>
                        <Typography variant="h2" sx={{ mb: 5 }}>Improve your productivity</Typography>
                        <Typography variant="h5" >
                            With our tool you always will be consentrating on important things
                            rather than on complexity of tools that you're using. 
                        </Typography>
                    </Box>
                </Box>
            </div>

            <div className="section flex f-c">
                <Box display='flex' flexDirection='row'>
                    <img
                    src={notesDemo}
                    alt="Notes demonstrations"
                    height={300}
                    style={{
                        border: '2px solid black'
                    }}
                     />
                     <Box 
                      display='flex' 
                      flexDirection='column' 
                      justifyContent='center' 
                      sx={{ ml: '5vw' }}>
                        <Typography variant="h2">Notes</Typography>
                        <Typography maxWidth={600} paragraph variant="h5">
                            Kanbanio provides you with easy and pleasant note taking experience. 
                            Store your notes in different folders. Our notes engine support Markdown 
                            syntax which brings you efficiency of note taking process.
                        </Typography>
                     </Box>
                </Box>
            </div>

            <div className="section flex f-c">
                <Box display='flex' flexDirection='row'>
                     <Box 
                      display='flex' 
                      flexDirection='column' 
                      justifyContent='center' 
                      sx={{ ml: '5vw' }}>
                        <Typography variant="h2">Todos</Typography>
                        <Typography maxWidth={600} paragraph variant="h5">
                            With Kanbanio you will always good in tracking your goals.
                            Our task list feature will help you to stay focused on tasks
                            that have to be done.
                        </Typography>
                     </Box>
                    <img
                    src={todosDemo}
                    alt="Todos demonstrations"
                    height={250}
                    style={{
                        border: '2px solid black'
                    }}
                     />
                </Box>
            </div>
            
            <ThemeProvider theme={blackWhiteTheme}>
                <Box
                 className="flex "
                 sx={{ backgroundColor: 'primary.main', height: '10vh' }}>
                    <Typography sx={{ color: "primary.contrastText" }} variant="h4">Kanbanio 2023</Typography>
                </Box>
            </ThemeProvider>
        </>
    )
}