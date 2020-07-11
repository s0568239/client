import React from 'react';
import Thedata from './FetchDataGericht';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { makeStyles } from "@material-ui/core/styles";
import useStyleIcon from './UseStyles';

const useStylesCard = makeStyles({
      rootCard: {
        minWidth: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        margin: 'auto',
        position: "left",
        backgroundColor: '#DCDCDC'
    }
  });

export default function Gerichte() {
    const CardClass = useStylesCard()
    const IconClass = useStyleIcon()
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

    const essen2 = Thedata('/mygericht/')
    var cards = []
    if (essen2 != null) {

        for (var i in essen2) {
            cards.push(
                <Card className={CardClass.rootCard}>
                    <CardContent>
                        <p id='cardsMain'>
                            {essen2[i].name}
                        </p>
                        <p id='cardsNotizen'>
                            {essen2[i].notes + ' '}
                        </p>
                        <h4 id='cardsSubtitel'>Preise</h4>
                        <p id='cardsGerichte'>
                            <label id='cardsGerichte'>Student: </label>{essen2[i].prices.students + '€'}
                        </p>
                        <p id='cardsGerichte'>
                            <label id='cardsGerichte'>Mitarbeiter: </label>{essen2[i].prices.employees + '€'}
                        </p>
                        <p id='cardsGerichte'>
                            <label id='cardsGerichte'>Andere: </label>{essen2[i].prices.others + '€'}
                        </p>
                    </CardContent>
                    <CardActions>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => { deleteGericht(essen2[i]); window.location.reload() }}>
                            <CloseIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            );
        }

    }
    if (essen2 == "") {

        return (
            <div>
                <p id='instructions'>Hier findest du deine Lieblingsgerichte. Du kannst  jederzeit neue hinzufügen oder entfernen.</p>
                <h2 id='HomeTitle2'>Meine Gerichte</h2>
                <hr id='line' />
                <div>
                    <p id='emptyList'>Die Liste ist leer, gehe ins Menü und wähle deine Lieblingsgerichte aus!</p>
                    <FastfoodIcon className={IconClass.Icon} />
                </div>
            </div>
        )

    } else {
        return (
            <div>
                <p id='instructions'>Hier findest du deine Lieblingsgerichte. Du kannst  jederzeit neue hinzufügen oder entfernen.</p>
                <h2 id='HomeTitle2'>Meine Gerichte</h2>
                <hr id='line' />
                {cards}
            </div>
        )
    }
}