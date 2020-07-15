import React from "react";
import MensaSelect from './SelectMensa';
import Button from '@material-ui/core/Button';
import MensaPosition from './nearMensa';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class MeineMensa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaName: "",
            data: [],
            liebling: {},
            isLoaded: false
        };
    }


    //https://www.robinwieruch.de/react-fetching-data
    async componentDidMount() {
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

    alertF = (l) => {
        this.postrequest()
         setTimeout(function() {
            document.location.reload()
      }, 1000);
        NotificationManager.success("Deine Lisblingsmensa wurde geändert!")
    }

    render() {
        const { liebling, isLoaded } = this.state

        if (isLoaded) {
            return (
                <div >
                    <div>
                        <h2 id='HomeTitle2'>Aktuelle Lieblingsmensa</h2>
                        <hr id='line'></hr>
                        <p id='HomeTitle1'>{(liebling.name === 'req.body.name') ? <p>Keine Mensa ausgewählt</p>:liebling.name}</p>
                        <div>
                            <h2 id='HomeTitle2'>In deiner Nähe</h2>
                            <hr id='line'></hr>
                            <MensaPosition />
                        </div>
                        <h2 id='HomeTitle2'>Mensa auswählen</h2>
                        <hr id='line'></hr>
                    </div>
                    <div>
                        <MensaSelect value={this.state.mensaName} select={this.selecting} />
                        <Button onClick={this.alertF}>Speichern</Button>
                    </div>
                    <NotificationContainer />
                </div>


            )
        } else {
            return <p>Daten werden geladen...</p>
        }


    }
}
export default MeineMensa








