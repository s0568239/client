import {useEffect } from 'react';

const PostDataMyMensa = (data) => {
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('/mymensa', requestOptions)
            .then(response => response.json());

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
}
export default PostDataMyMensa