import {useState, useEffect} from 'react'

const Thedata = (url) => {
    const [readyLiebling, setreadyLiebling] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(url)
            const data = await response.json()
            //console.log(data)
            setreadyLiebling(data)
            //console.log(this.state.readyLiebling[2].id + " testing")
        };
        loadData(url)

    }, []);
    return readyLiebling
}
export default Thedata