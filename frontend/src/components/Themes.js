import { createTheme } from "@mui/material"

export const blackWhiteButtonTheme = createTheme({
    palette: {
        primary: {
           main: '#000',
           contrastText: '#fff'
        }
    }
})

export const whiteBlackButtonTheme = createTheme({
    palette: {
        primary: {
           main: '#fff',
           contrastText: '#000'
        }
    }
})
