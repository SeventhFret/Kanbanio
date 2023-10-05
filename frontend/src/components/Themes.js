import { createTheme } from "@mui/material";
// import makeStyles from "@mui/styles";


// export const textInputStyles = makeStyles({
//     root: {
//       "& label.Mui": {
//         color: 'white'
//       },
//       // input label when focused
//       "& label.Mui-focused": {
//         color: "white"
//       },

//       // focused color for input with variant='outlined'
//       "& .MuiOutlinedInput-root": {
//         "&.Mui-focused fieldset": {
//           borderColor: "white"
//         }
//       }
//     }
//   });

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
