import React from 'react';
import UseDataFetch from '../functional/FetchMensa';

const Mensaliste = () => {
    const data = UseDataFetch('/mensen');
    var options = [];
    const postTitle = () => {
        if (data) {
            for (var i in data) {
                options.push(<option value={data[i].name} key={i}>{data[i].name}</option>);
            }
            return options;
        } else {
            return <option key={i}>Daten werden geladen...</option>;
        }
    };

    return (
        postTitle()
    );
}

export default Mensaliste;