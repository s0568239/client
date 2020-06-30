import React from 'react';
import UseDataFetch from './FetchMensa';

const Mensaliste = () => {
    const data = UseDataFetch('/mensen');
    var options = [];
    const postTitle = () => {
        if (data) {
            for (var i in data) {
                options.push(<option value={data[i].name}>{data[i].name}</option>);
            }
            return options;
        } else {
            return <h2>Daten werden geladen...</h2>;
        }
    };

    return (
        postTitle()
    );
}

export default Mensaliste;