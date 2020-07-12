import MensaSelect from './SelectMensa';
import React from 'react';
import UseDataFetch from './FetchMensa'
import { Card, CardContent } from '@material-ui/core';

class MensenSicht extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaName: "",
            data: []
        };
    }


    async test(url) {

        const response = await fetch(url);
        const json = await response.json();
        this.setState({ data: json[0] });
    };


    selecting = (event) => {
        this.setState({ mensaName: event.target.value })
        this.test('/mensen/' + event.target.value)
    }

    render() {
        if (this.state.mensaName != "") {
            return (
                <div>
                    <p id='instructions'>Hier findest du eine Übersicht alle Mensen in Deutschland.</p>
                    <h2 id='HomeTitle2'>Meine Gerichte</h2>
                    <hr id='line' />
                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                    <Card>
                        <CardContent>
                            <h4>{this.state.data.name}</h4>
                            <p>{this.state.data.address}</p>
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <p id='instructions'>Hier findest du eine Übersicht alle Mensen in Deutschland.</p>
                    <h2 id='HomeTitle2'>Meine Gerichte</h2>
                    <hr id='line' />
                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                </div>
            )
        }

    }
}
export default MensenSicht