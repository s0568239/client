import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MensaListe from './MensaListe';



export default class MensaSelect extends React.Component{
    
    
    render() {
    return (
        <div>
            <FormControl required >
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
                    <MensaListe/>
                </Select>
            </FormControl>
        </div>
    );
}
}