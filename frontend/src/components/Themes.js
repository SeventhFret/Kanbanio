import { createTheme } from "@mui/material";



export const blackWhiteTheme = createTheme({
    palette: {
        primary: {
           main: '#000',
           contrastText: '#fff'
        },
        secondary: {
            main: '#fff',
            contrastText: '#000'
        }

    },

})

export const whiteBlackTheme = createTheme({
    palette: {
        primary: {
           main: '#fff',
           contrastText: '#000'
        }
    },

})

export const redButtonTheme = createTheme({
    palette: {
        primary: {
            main: "#d50000",
            contrastText: "#fff"
        }
    }
})
