import React from "react";
import MensaSelect from './SelectMensa';
import Button from '@material-ui/core/Button';

export default class MeineMensa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaName: null,
            data: null,
            liebling: [],
            isLoaded: false
        };
    }


    //https://www.robinwieruch.de/react-fetching-data
    componentWillMount() {
        this.setState({ isLoaded: true })
        fetch('/mensen')
            .then(response => response.json())
            .then(data => this.setState({ data }));
        fetch('/mymensa')
            .then(response => response.json())
            .then(liebling => this.setState({ liebling }));
    }

    selecting = (event) => {
        this.setState({ mensaName: event.target.value })
    }

    postrequest = () => fetch('/mymensa', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.getData())
    })

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
        return (
            <div>
                {
                    (isLoaded) ?
                        liebling.map(titel => {
                            const { name } = titel;
                            return (
                                <div>
                                    <h2>Meine Lieblingsmensa</h2>
                                    <p>{name}</p>
                                    <h1>Mensa auswählen</h1>
                                    <hr id='linia'></hr>
                                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                                    <Button onClick={this.alertF}>Speichern</Button>
                                </div>
                            )
                        }

                        ) : <p>no test</p>

                } </div>
        )
    }
}








