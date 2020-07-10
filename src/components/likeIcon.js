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

class LikeIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardView: false,
            gericht: NaN,
            readyLiebling: []
        };

    }

    //Fetch Lieblingsgerichte
    async componentDidMount(){
        const response = await fetch('/mygericht/')
        const data = await response.json()
        this.setState({readyLiebling: data})
        //console.log(this.state.readyLiebling[2].id + " testing")
        
    }

    isLiebling(g){
        const myLiebling = this.state.readyLiebling
        var bool = NaN
        for(var i =0; i < myLiebling.length; i++){
            
            if(g.id == myLiebling[i].id){
                bool = true
                break;
                
            }else {
                bool = false
                return false
            }
            
        }
        return bool;
    }

    //  https://stackoverflow.com/questions/41852930/reactjs-how-to-change-an-icon-of-a-button-on-the-click-event
    render() {
        const g = this.props.g
        const myLiebling = this.isLiebling(g);
        /* console.log(this.state.readyLiebling["id"] + " testing") */
        /* if(this.state.isCardView){
            postGericht(g)
        } */
        if(myLiebling){
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
}
export default LikeIcon