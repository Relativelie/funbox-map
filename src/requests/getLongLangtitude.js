import "regenerator-runtime/runtime";
import "core-js/stable"; 


export const getLongLangtitude = async (pointValue) => {
    try {
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=93dcdcff-e757-4a6d-876e-71c4e2993af&format=json&geocode=${pointValue}`);
        const result = await response.json();
        if (result.statusCode !== undefined) {
            return ["error", result.statusCode]
        }
        else {
            let longtitudeLatitude = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ").map(Number);
            longtitudeLatitude = [longtitudeLatitude[1], longtitudeLatitude[0]]
            const data = [
                longtitudeLatitude,
                result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text
            ]
            return data
        }

    }
    catch(err)  {
        return "fatal"
    }
}