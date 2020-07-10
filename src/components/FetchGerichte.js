import React, {useState, useEffect} from 'react'

const Thedata = () => {
    const [readyLiebling, setreadyLiebling] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const response = await fetch('/mygericht/')
            const data = await response.json()
            //console.log(data)
            setreadyLiebling(data)
            //console.log(this.state.readyLiebling[2].id + " testing")
        };
        loadData('/mygericht/')

    }, []);
    return readyLiebling
}
export default Thedata