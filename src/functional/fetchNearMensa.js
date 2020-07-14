import { useState, useEffect } from 'react'

//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

const Localitation = () => {
    const [data, setData] = useState([]);
    const [ditance, setDis] = useState(0)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {

                var url = 'http://openmensa.org/api/v2/canteens?near[lat]=' + position.coords.latitude + '&near[lng]=' + position.coords.longitude + '&near[dist]=5';
                const response = await fetch(url);
                const data = await response.json()
                setData(data[0])
                var a = getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,data[0].coordinates[0],data[0].coordinates[1])
                a = Math.round(a * 100) / 100
                setDis(a)
                
            });

        }
    },[]) 
    return [data, ditance]
}
export default Localitation