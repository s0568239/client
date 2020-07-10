import React, { useState, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';


export default function LikeIcon(props) {

    const [isDelete, setisDelete] = useState(true);
    const [isAdded, setisAdded] = useState(false);
    //Fetch Lieblingsgerichte
    const Thedata = () => {
        const [readyLiebling, setreadyLiebling] = useState([]);
        useEffect(() => {
            const loadData = async () => {
                const response = await fetch('/mygericht/')
                const data = await response.json()
                //console.log(data)
                setreadyLiebling(data)
                //console.log(this.state.readyLiebling[2].id + " testing")
            };
            loadData('/mygericht/')

        }, []);
        return readyLiebling
    }

    const g = props.g
    const meineGerichte = Thedata()

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
        console.log(data)
    }

    const isLiebling = () => {
        var bool = [];
        var bool2 = []
        for (var i in meineGerichte) {

            //console.log(meineGerichte[1].id + " mm")
            if (g.id == meineGerichte[i].id) {
                console.log(meineGerichte[i].id)
                bool.push(<FavoriteOutlinedIcon />);

            } else {
                bool.push(<FavoriteBorderOutlinedIcon />);
                bool.pop(0)
            }
            console.log(bool2[i])

        } return bool
    }

    const t = isLiebling();

    if (meineGerichte == "" || t == "") {
        if (!isAdded) {
            return (
                <IconButton key="tableModeButton"
                    onClick={() => { postGericht(g) }}
                >
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
            )
        } else{
            return(
                <IconButton onClick={() => { deleteGericht(g) }}>
                    <FavoriteOutlinedIcon/>
                </IconButton>
            )
            window.location.reload()
        }
    } else {
        if (isDelete) {
            return (
                <IconButton onClick={() => { deleteGericht(g) }}>
                    {t}
                </IconButton>
            )
        } else {
            return (
                <IconButton key="tableModeButton"
                    onClick={() => { postGericht(g); window.location.reload() }}
                >
                    <FavoriteBorderOutlinedIcon />
                </IconButton>)
        }
        
    }





    //  https://stackoverflow.com/questions/41852930/reactjs-how-to-change-an-icon-of-a-button-on-the-click-event
    /* render() {
        const g = this.props.g
        const myLiebling = this.isLiebling(g);
        /* console.log(this.state.readyLiebling["id"] + " testing") */
    /* if(this.state.isCardView){
        postGericht(g)
    } */
    /* if(myLiebling){
        return(
            <IconButton key="tableModeButton" >
            <FavoriteBorderOutlinedIcon />
        </IconButton>
        )
    }else{
        return(
            <IconButton key="tableModeButton"
            onClick={() => {
                this.setState({
                    gericht: g
                })
                this.setState({
                    isCardView: !this.state.isCardView
                })
                if(!this.state.isCardView){
                    postGericht(g)
                }
                
                
            }

            } >
            {this.state.isCardView ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        )
    } 
         */

    /* return (
        <IconButton key="tableModeButton"
            onClick={() => {
                this.setState({
                    gericht: g
                })
                this.setState({
                    isCardView: !this.state.isCardView
                })
                if(!this.state.isCardView){
                    postGericht(g)
                }
                
                
            }

            } >
            {this.state.isCardView ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>) */
}
