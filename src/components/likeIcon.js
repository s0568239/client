import React from 'react';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import IconButton from '@material-ui/core/IconButton';

const postGericht = async (g) => {
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

const fetchGericht = async (g) => {
    const response = await fetch('/mygericht/' + g.id)
    return response
}


class LikeIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardView: false,
            gericht: NaN,
            readyLiebling: NaN
        };

    }

    //  https://stackoverflow.com/questions/41852930/reactjs-how-to-change-an-icon-of-a-button-on-the-click-event
    render() {
        const g = this.props.g
        const t = fetchGericht(g)
        console.log(t.id)
        if(this.state.isCardView){
            postGericht(g)
        }
        return (
            <IconButton key="tableModeButton"
                onClick={() => {
                    this.setState({
                        gericht: g
                    })
                    this.setState({
                        isCardView: !this.state.isCardView
                    })
                    
                    
                }

                } >
                {this.state.isCardView ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>)
    }
}
export default LikeIcon