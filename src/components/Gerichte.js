import Switch from '@material-ui/core/Switch';
import React from 'react'

class Gerichte extends React.Component {
    
    render() {
        return (
            <Switch
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        )
    }

}
export default Gerichte