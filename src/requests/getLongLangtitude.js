import 'regenerator-runtime/runtime';
import 'core-js/stable';

export const getLongLangtitude = async (pointValue) => {
    try {
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_API_KEY}&format=json&geocode=${pointValue}`,
        );
        const result = await response.json();
        if (result.statusCode !== undefined) {
            return ['error', result.statusCode];
        }

        // eslint-disable-next-line max-len
        let longtitudeLatitude = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(' ')
            .map(Number);
        longtitudeLatitude = [longtitudeLatitude[1], longtitudeLatitude[0]];
        const data = [
            longtitudeLatitude,
            result.response.GeoObjectCollection.featureMember[0].GeoObject
                .metaDataProperty.GeocoderMetaData.text,
        ];
        return data;
    } catch (err) {
        return 'fatal';
    }
};
