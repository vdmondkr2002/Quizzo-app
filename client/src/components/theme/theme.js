import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9F7FFD',
      main: '#7A51F5',
      dark: '#662583',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    text:{
        primary:'#333',
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