import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MensaListe from './MensaListe';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(8),
        minWidth: 200
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function MensaSelect() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: "",
        name: "hai"
    });

    const handleChange = event => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    return (
        <div>
            <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Lieblingsmensa auswählen</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={handleChange}
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
