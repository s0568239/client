import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MensaSelect from './SelectMensa';
import Button from '@material-ui/core/Button';
import UseDataFetch from './FetchMensa'

export default function MeineMensa() {
    const [mensaName, setmensaName] = React.useState("")
    const allemensa = UseDataFetch('/mensen')


    const selecting = (event) => {
        setmensaName(event.target.value)
        console.log(allemensa)
    }
    //Man hasse ich dich
    const alertF = () => {
        alert(mensaName)
        
        
    }
    
    return (
        <div>
            <h2>Meine Lieblingsmensa</h2>
            <hr id = 'linia'></hr>
            <p>{mensaName}</p>
        
    
            <h1>Mensa auswählen</h1>
            <hr id = 'linia'></hr>
            <MensaSelect value = {mensaName} select={selecting}/>
            <Button onClick={alertF}>LOL</Button>
        </div>
    );
}
