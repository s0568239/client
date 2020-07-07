import React from 'react'
import TimeHome from './timeHome'


class MyHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false
        };
    }

    componentWillMount() {
        this.setState({ isLoaded: true })
        fetch('/mymensa')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        const { data, isLoaded } = this.state
        return (
            <React.Fragment>
                {
                    (isLoaded) ?
                        data.map(titel => {
                            const { name } = titel;
                            return (
                                <div>
                                    <h2>{name}</h2>
                                    <TimeHome/>
                                    
                                </div>
                            )
                        }

                        ) : <p>no test</p>
                }

            </React.Fragment>

        )
    }
}
export default MyHome