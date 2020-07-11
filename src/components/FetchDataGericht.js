import {useState, useEffect} from 'react'

const Thedata = (url) => {
    const [readyLiebling, setreadyLiebling] = useState([]);
    useEffect(() => {
        const loadData = async (url) => {
            const response = await fetch(url)
            
            const data = await response.json()
            
            setreadyLiebling(data)
            
        };
        loadData(url)

    }, [url]);
    
    return readyLiebling
}
export default Thedata