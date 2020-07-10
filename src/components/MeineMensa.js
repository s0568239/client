import React from "react";
import MensaSelect from './SelectMensa';
import Button from '@material-ui/core/Button';

export default class MeineMensa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaName: null,
            data: null,
            liebling: {},
            isLoaded: false
        };
    }


    //https://www.robinwieruch.de/react-fetching-data
    async componentWillMount() {
        this.setState({ isLoaded: true })

        const response = await fetch('/mensen');
        const mdata = await response.json();
        this.setState({ data: mdata });

        const response2 = await fetch('/mymensa');
        const mdata2 = await response2.json();

        this.setState({ liebling: mdata2[0] });
        
    }

    selecting = (event) => {
        this.setState({ mensaName: event.target.value })
    }

    /* postrequest = () => fetch('/mymensa', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.getData())
        
    }) */

    postrequest() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.getData())
        };
        fetch('/mymensa', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
     

    getData() {
        var dataM = {}

        for (var x in this.state.data) {
            if (this.state.data[x].name === this.state.mensaName) {
                dataM = this.state.data[x]
            }

        }
        return dataM
    }

    alertF = () => {
        this.postrequest()
        window.location.reload(false); 
    }

    render() {
        const { liebling, isLoaded } = this.state

        if (isLoaded) {
            return (
                <div>
                    <h2>Meine Lieblingsmensa</h2>
                    <p>{liebling.name}</p>
                    <h1>Mensa auswählen</h1>
                    <hr id='linia'></hr>
                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                    <Button onClick={this.alertF}>Speichern</Button>
                </div>

            )
        }else{
            return <p>sdfsdf</p>
        }


    }
}








