import React, { Component } from 'react'
import TimeHome from './timeHome'


class MyHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data2: [],
            isLoaded: false
        };
    }

    async componentDidMount() {

        const response = await fetch('/mymensa');
        const data = await response.json();
        this.setState({ data2: data })
        this.setState({ isLoaded: true })
    }

    render() {
        const { data2, isLoaded } = this.state
        //console.log(data2[0].name + " this data")
        if (isLoaded) {
            return (
                <div>
                    <h1 id="HomeTitle1">{data2[0].name}</h1>
                    <TimeHome />

                </div>
            )
        } else {
            return (
                <p>Laden...</p>
            )
        }

    }
}
export default MyHome