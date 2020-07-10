import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MensaListe from './MensaListe';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

class MensaSelect extends React.Component {


    render() {
        
        const { classes } = this.props;

        return (
            <div>
                <FormControl className={classes.root} >
                    <InputLabel htmlFor="age-native-required">Lieblingsmensa auswählen</InputLabel>
                    <Select
                        native
                        value={this.props.value}
                        onChange={this.props.select}
                        name="age"
                        inputProps={{
                            id: "age-native-required"
                        }}
                    >
                        <option aria-label="None" value="" />
                        <MensaListe />
                    </Select>
                </FormControl>
            </div>
        );
    }
}
export default withStyles(styles)(MensaSelect);