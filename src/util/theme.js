import { createMuiTheme } from '@material-ui/core/styles'

export const drawerWidth = 300
export const appBarHeight = 70

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#fff',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DE2548',
      main: '#f00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    // background: '#DE2548',
  },
  typography: {
    fontFamily: "['Oswald', 'sans-serif'].join(',')",
  },
})

export const styles = (theme) => ({
  root: {
    background: '#DE2548',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.down('xs')]: {
      height: appBarHeight,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#fff',
  },
  content: {
    minHeight: '100vh',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${appBarHeight}px)`,
      marginTop: appBarHeight,
    },
    background: '#DE2548',
  },
  icons: {
    color: '#000',
  },
  logoXs: {
    padding: '10px',
    paddingLeft: '50px',
    margin: 'auto',
    height: 55,
  },
  logoSmUp: {
    objectFit: 'contain',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
    width: drawerWidth * 0.9,
    height: drawerWidth,
    margin: 'auto',
    display: 'block',
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
  socialMediaIcons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    marginTop: '5%',
  },
  companyNameXs: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: 'black',
    fontSize: '2em',
    margin: 'auto',
  },
  companyNameOnDrawer: {
    padding: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: 'black',
    fontSize: '2.6em',
  },
  listItemText: {
    fontSize: '1.5em',
    margin: theme.spacing(-1),
  },

  imageContentBox: {
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
      paddingTop: `calc(3% + ${appBarHeight}px)`,
      marginTop: -1 * appBarHeight,
      background: '#DE2548',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '4%',
      background: '#DE2548',
    },
  },

  imageContent: {
    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${appBarHeight}px)`,
      padding: '2%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '2%',
      marginRight: '2%',
      padding: '2%',
    },
    background: 'white',
    color: '#fff',
  },

  cardMedia: {
    minWidth: '100%',
    backgroundSize: 'contain',
    cursor: 'pointer',
  },

  mediaRoot: {
    margin: 'auto',
    marginBottom: '2.5%',
    borderRadius: '0px',
    boxShadow: 'none',
    border: 0,
  },

  contactContentBox: {
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
      paddingTop: `calc(3% + ${appBarHeight}px)`,
      marginTop: -1 * appBarHeight,
      height: `calc(100% - ${appBarHeight}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: '2% 10%',
    },
  },

  contactContent: {
    [theme.breakpoints.down('xs')]: {
      padding: '5%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
      marginRight: '5%',
      padding: '5%',
    },
    background: 'white',
    color: '#fff',
  },

  contactForm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '95%',
    },
  },
  customError: {
    color: 'red',
    fontSize: '1.5rem',
    width: '95%',
    padding: '1%',
    textAlign: 'center',
  },

  textField: {},
})
