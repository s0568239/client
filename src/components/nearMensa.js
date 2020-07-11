import React, {useState } from "react";
import { Card, CardActions, IconButton } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Localitation from './fetchNearMensa';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Thedata from './FetchMyMensa'


function NearMensa() {
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
                <Card>
                    <CardContent>
                        <h4>{t[0].name}</h4>
                        <h4>{t[0].address}</h4>
                        <h4>{t[1]} Kilometer</h4>
                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>

            </div>
           )
    } else {
        return (
            <div>
            <Card>
                <CardContent>
                    <h4>{t[0].name}</h4>
                    <h4>{t[0].address}</h4>
                    <h4>{t[1]} Kilometer</h4>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => { onCli() }}>
                        <FavoriteBorderIcon />
                    </IconButton>
                </CardActions>
            </Card>

        </div>
        
        );
    }
}

export default NearMensa