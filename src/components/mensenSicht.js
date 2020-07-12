import MensaSelect from './SelectMensa';
import React from 'react';
import UseDataFetch from './FetchMensa'
import { Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        minWidth: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 'auto',
        position: "left",
        backgroundColor: '#FFFFFF',
        boxShadow: 3
    }
});

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
        const { classes } = this.props;
        if (this.state.mensaName != "") {
            return (
                <div>
                    <p id='instructions'>Hier findest du die Namen und Adressen aller Mensen in Deutschland.</p>
                    <h2 id='HomeTitle2'>Mensa-Auswahl</h2>
                    <hr id='line' />
                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                    <Card className={classes.root}>
                        <CardContent>
                            <h4 id='MeineMensaSubtitel'>{this.state.data.name}</h4>
                            <p id='cardsMensen'>{this.state.data.address}</p>
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <p id='instructions'>Hier findest du die Namen und Adressen aller Mensen in Deutschland.</p>
                    <h2 id='HomeTitle2'>Mensa-Auswahl</h2>
                    <hr id='line' />
                    <MensaSelect value={this.state.mensaName} select={this.selecting} />
                </div>
            )
        }

    }
}
export default withStyles(useStyles)(MensenSicht) 