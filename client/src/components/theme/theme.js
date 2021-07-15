import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#DA9FF9',
      main: '#B088F9',
      dark: '#7952B3',
      contrastText: '#000',
    },
    secondary: {
      light: '#BEDCFA',
      main: '#98ACF8',
      dark: '#94D0CC',
      contrastText: '#fff',
    },
    text:{
        primary:'#0A1931',
        secondary:'#777',
        disabled:'#999'
    },
    action:{
      light:'#82ff64',
      main:'#40ed2b',
      dark:'#00b900',
      contrastText:"#fff"
    }
  },
  typography: {
      color:'#505050',
      fontFamily: 'Raleway, Arial' 
  }
});

// DA9FF9