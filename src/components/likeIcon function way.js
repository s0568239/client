import React, { useState} from 'react';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';
import useStyle from '../functional/UseStyles';
import Thedata from '../functional/FetchMensa';

export default function LikeIcon(props) {
    const lieblingsGericht = useStyle()
    const [isDelete, setisDelete] = useState(true);
    const [isAdded, setisAdded] = useState(false);
    //Fetch Lieblingsgerichte
    const g = props.g
    const meineGerichte = Thedata('/mygericht/')

    //Fügt Lieblingsgerichte hinzu
    const postGericht = async (g) => {
        setisAdded(true)
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(g)
        };
        const response = await fetch('/mygericht', requestOptions);
        const data = await response.json();
        console.log(data)

    }

    //Löscht Lieblingsgericht
    const deleteGericht = async (g) => {
        setisDelete(false)
        // POST request using fetch with async/await
        const tg = g
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ""
        };
        const response = await fetch('/mygericht/' + tg.id, requestOptions);
        const data = await response.json();
    }

    const isLiebling = () => {
        var bool = [];

        for (var i in meineGerichte) {

            if (g.id == meineGerichte[i].id) {
                
                bool.push(<FavoriteOutlinedIcon className={lieblingsGericht.HerzIcon} key="tableModeButton"/>);

            } else {
                
                bool.push(<FavoriteBorderOutlinedIcon className={lieblingsGericht.HerzIcon} key="tableModeButton"/>);
                bool.pop(0)
            }
            

        } return bool
    }

    const t = isLiebling();

    if (meineGerichte == "" || t == "") {
        if (!isAdded) {
            return (
                <IconButton key="tableModeButton4"
                    onClick={() => { postGericht(g) }}
                >
                    <FavoriteBorderOutlinedIcon className={lieblingsGericht.HerzIcon} key="tableModeButton" />
                </IconButton>
            )
        } else{
            return(
                
                <IconButton onClick={() => { deleteGericht(g); window.location.reload() }} key="tableModeButton">
                    <FavoriteOutlinedIcon className={lieblingsGericht.HerzIcon} key="tableModeButton"/>
                </IconButton>
            )
            
        }
    } else {
        if (isDelete) {
            return (
                <IconButton onClick={() => { deleteGericht(g) }} key="tableModeButton">
                    {t}
                </IconButton>
            )
        } else {
            return (
                <IconButton key="tableModeButton"
                    onClick={() => { postGericht(g); window.location.reload() }}
                    
                >
                    <FavoriteBorderOutlinedIcon className={lieblingsGericht.HerzIcon} key="tableModeButton"/>
                </IconButton>)
        }
        
    }

}
