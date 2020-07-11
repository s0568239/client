import React from 'react';
import Thedata from './FetchGerichte';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


export default function Gerichte() {

    //Löscht Lieblingsgericht
    const deleteGericht = async (g) => {
        //setisDelete(false)
        // POST request using fetch with async/await
        const tg = g
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ""
        };
        const response = await fetch('/mygericht/' + tg.id, requestOptions);
        const data = await response.json();
        console.log(data)
    }

    const essen2 = Thedata()
    var cards = []
    if (essen2 != null) {

        for (var i in essen2) {
            cards.push(
                <Card >
                    <CardContent>
                        <Typography color="secondary" variant="h5" component="h2">
                            {essen2[i].name}
                        </Typography>
                        <Typography component="h2" color="textSecondary">
                            {essen2[i].notes + ' '}
                        </Typography>
                        <h5>Preis</h5>
                        <Typography component="h2" color="textSecondary">
                            <label>Student: </label>{essen2[i].prices.students + '€'}
                        </Typography>
                        <Typography component="h2" color="textSecondary">
                            <label>Mitarbeiter: </label>{essen2[i].prices.employees + '€'}
                        </Typography>
                        <Typography component="h2" color="textSecondary">
                            <label>Andere: </label>{essen2[i].prices.others + '€'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={() =>{deleteGericht(essen2[i]); window.location.reload()}}>
                            <CloseIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            );
        }

    }
    if(essen2 == ""){
        
        return( 
        <div>
            <p>Ruben de España le tocaron</p>
            <hr id= 'line'/>
        <p>LOL</p></div>
        )

    }else{
    return (
        <div>
            <p>Ruben de España le tocaron</p>
            <hr />
            {cards}
        </div>
    )}
}