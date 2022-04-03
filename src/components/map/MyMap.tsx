
import { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getLongLangtitude } from "../../requests/getLongLangtitude";


export const MyMap = () => {

  const { points, routes, isFetchFail } = useTypedSelector(state => state.points);
  const { changePointCoordinates } = useActions()
  const [myCenter, setMyCenter] = useState({ center: [55.75, 37.57], zoom: 9 });
  const mapRef: any = useRef(null);




  useEffect(() => {
    if (points.length !== 0 && !isFetchFail) {
      setMyCenter({ center: points[0][0], zoom: 13 });
      console.log("points", points)
      console.log("routes", routes)
    }
  }, [points])



  const changeCoordinates = async (e: any, key: number) => {
    const coordinates = e.get('target').geometry.getCoordinates();
    const destinationName = await getLongLangtitude([coordinates[1], coordinates[0]]);
    changePointCoordinates(key, coordinates, destinationName[1])
  }


  return (
    <YMaps query={{ apikey: '93dcdcff-e757-4a6d-876e-71c4ee2993af' }}>

      <Map
        className="map"
        state={myCenter}
        instanceRef={(ref) => { if (ref) mapRef.current = ref }}
      >
        {points.map((elem:any, index:any) => (
          <Placemark
            className="placemark"
            onDragEnd={(e: any) => changeCoordinates(e, index)}
            options={{
              preset: "islands#redDotIcon",
              iconColor: "rgba(145,14,190,0.8954175420168067)",
              draggable: true
            }}
            key={`placemark-${index}`}
            geometry={elem[0]} />
        ))}

        <Polyline
          geometry={routes}
          options={{
            balloonCloseButton: false,
            strokeColor: "rgba(114, 39, 222, 0.9010197829)",
            strokeWidth: 5,
            strokeOpacity: 0.7,
          }}
        />

      </Map>

    </YMaps>
  )
}