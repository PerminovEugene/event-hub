import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3714B0',
      dark: '#402C84',
      contrastText: '#1F0772',
      main: '#FFFD00', //#3714B0	#402C84	#1F0772	#6949D7	#866FD7
    },
    secondary: {
      main: '#FFA900', // #FFFD00	#BFBE30	#A6A500	#FFFE40	#FFFE73
      light: '#3714B0',
      dark: '#402C84',
      contrastText: '#1F0772',
      //#FFA900	#BF8F30	#A66E00	#FFBE40	#FFCF73
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#1F0772',
    },
  },
  // Example of all Mui input override
  // overrides: {
  //   MuiTextField: {
  //     root: {
  //       marginTop: '30px',
  //     },
  //   },
  // },
});

export default theme;
