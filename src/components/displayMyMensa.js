import React from 'react'

class displayMyMensa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myMensa: [],
            loading: false,
        }
    }

    componentWillMount() {
        this.setState({ loading: true })
        fetch('/mymensa')
            .then(response => response.json())
            .then(myMensa => this.setState({ myMensa, loading: false }))
    }

    render() {
        const { myMensa, loading } = this.state
        return (
            <div>
                {(loading) ?
                    <p>Lieblingsmensa wird geladen...</p> :
                    (!myMensa.length) ?
                        <p>Keine Mensa ausgewählt</p> :
                        <ul>
                            {myMensa.map((x, i) => <li key={i}>{x}</li>)}
                        </ul>}
            </div>
        )
    }
}
export default displayMyMensa