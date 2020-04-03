const { getData } = require('./utils');

const getCoordinate = async (town) => {
    try {
        const result = await getData(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(town)}.json?access_token=pk.eyJ1IjoiaG9ib3RzbG9uYSIsImEiOiJjazF6OWV0MDQwOWdoM25wOTF4cmtlbmhzIn0.K75MrLSsvKHD4PU-zkzeFw`);

        const longitude = result.data.features[0].center[0];
        const latitude = result.data.features[0].center[1];
        const place = result.data.features[0].place_name;
        const coordinates = {
            longitude,
            latitude,
            place
        }
        return coordinates;
    } catch (e) {
        console.log('Cant find the place');
        return { }
    }
}

module.exports = {
    getCoordinate
}