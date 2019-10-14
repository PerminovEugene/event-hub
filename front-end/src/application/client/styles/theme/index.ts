import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from './colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: palette,
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
