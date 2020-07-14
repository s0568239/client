import React, {useState } from "react";
import { Card, CardActions, IconButton } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Localitation from '../functional/fetchNearMensa';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Thedata from '../functional/FetchMyMensa';
import { makeStyles } from "@material-ui/core/styles";
import useStyle from '../functional/UseStyles';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const locationCard = makeStyles({
    loCard: {
      minWidth: 70,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      marginBottom: 10,
      margin: 'auto',
      position: "left",
      backgroundColor: '#FFFFFF',
      boxShadow: 3
  },
  likeButton:{
      flexDirection: 'row-reverse'
  },
  LocationIcon:{
    color: '#696969',
    fontSize: '15px'
  }
});

function NearMensa() {
    const CardClass = locationCard()
    const lieblingsMensa = useStyle()
    const [isLike, setIsLike] = useState(false)
    const t = Localitation()
    const myMensa = Thedata('/mymensa')
    

    const onCli = () => {
        setIsLike(!isLike)
        if (!isLike) {
            postrequest()
            alert("Deine Mensa wurde soeben geändert!")
            window.location.reload()
        }
    }

    const postrequest = () => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(t[0])
        };
        fetch('/mymensa', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    if (myMensa.name == t[0].name) {
        return (
            <div>
                <Card className = {CardClass.loCard}>
                    <CardContent>
                        <p id='MeineMensaSubtitel'>Mensa:</p>
                        <p id='cardsMensen'>{t[0].name}</p>
                        <p id='MeineMensaSubtitel'>Adresse:</p>
                        <p id='cardsMensen'>{t[0].address}</p>
                        <p id='MeineMensaSubtitel'>Entfernung:</p>
                        <p id='cardsMensen'><LocationOnIcon className={CardClass.LocationIcon} /> {t[1]} Kilometer</p>
                    </CardContent>
                    <CardActions className={CardClass.likeButton}>
                        <IconButton>
                            <FavoriteIcon   className={lieblingsMensa.HerzIcon}/>
                        </IconButton>
                    </CardActions>
                </Card>

            </div>
           )
    } else {
        return (
            <div>
            <Card className = {CardClass.loCard}>
                <CardContent>
                        <p id='MeineMensaSubtitel'>Mensa:</p>
                        <p id='cardsMensen'>{t[0].name}</p>
                        <p id='MeineMensaSubtitel'>Adresse:</p>
                        <p id='cardsMensen'>{t[0].address}</p>
                        <p id='MeineMensaSubtitel'>Entfernung:</p>
                        <p id='cardsMensen'><LocationOnIcon className={CardClass.LocationIcon} /> {t[1]} Kilometer</p>
                </CardContent>
                <CardActions className={CardClass.likeButton}>
                    <IconButton onClick={() => { onCli() }}>
                        <FavoriteBorderIcon className={lieblingsMensa.HerzIcon}/>
                    </IconButton>
                </CardActions>
            </Card>

        </div>
        
        );
    }
}

export default NearMensa