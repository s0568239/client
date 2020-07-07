import React, { Component } from 'react'
import TimeHome from './timeHome'


class MyHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        this.setState({ isLoaded: true })
        fetch('/mymensa')
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        const { data, isLoaded } = this.state
        if (isLoaded) {
            return (
                <div>
                    <h2>{data.name}sadasdasd</h2>
                    <TimeHome />

                </div>
            )
        }else{
            return(
                <p>Laden...</p>
            )
        }

    }
}
export default MyHome