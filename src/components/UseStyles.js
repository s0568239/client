import { makeStyles } from "@material-ui/core/styles";

const useStylesIcon = makeStyles({

  Icon: {
    color: 'gray',
    fontSize: '40px'
  },
  FormControl: {
    minWidth: 12000
  },
  list: {
    width: 200
  },
  fullList: {
    width: "auto"
  },
  link: { textDecoration: 'none' },

  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#76B900',
    },
    rootCard: {
      minWidth: 70,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      marginBottom: 10,
      margin: 'auto',
      position: "left",
      backgroundColor: '#DCDCDC'
  }
  }
});


export default useStylesIcon
