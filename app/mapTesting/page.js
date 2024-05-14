'use client'
import { useRef, useState, useEffect } from 'react';

function MapComponent() {
  const mapRef = useRef(null)
  const [amapLoaded, setAmapLoaded] = useState(false)
  const [data, setData] = useState([]);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const autoCompleteContiner = useRef(null)
  const [keyWord, setKeyWord] = useState("大家")
  const placeSearchContiner = useRef(null)

  window._AMapSecurityConfig = {
    securityJsCode: "5a70a60f476d153b9b6caa45864b605f",
  };

  async function send(value) {
     fetch(
             `https://restapi.amap.com/v3/assistant/inputtips?parameters`+
             `&key=8ede03f2819e3b30ca3b8db8eee4ee5d`+
             `&keywords=${value}`+
             `&city=820000`+
             `&city_limit=true`+
             `&page_size=25`,
             {
                 method: "get",
             }
         ).then(async(res) => {
        res = await res.json();
        setData(res.pois);
        console.log("res",res.tips);
        let listData = [];
        res.tips.forEach((item) => {
          listData.push({id: item.id, name: item.name})
        })
        setAutoCompleteData(listData);
      })
  }

  useEffect(() => {
    console.log("autoCompleteData",autoCompleteData)
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      import('@amap/amap-jsapi-loader').then(AMapLoader => {
        AMapLoader.load({
          city:"澳門",
          key: 'b92a5dfebcf8e5ba5cce62051141de74',
          version: '2.0',
        }).then((AMap) => {
          setAmapLoaded(true)
          mapRef.current = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '2D', // 是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [113.568683, 22.162143], // 初始化地图中心点位置
          });

          AMap.plugin(['AMap.PlaceSearch','AMap.AutoComplete'],() => {
            autoCompleteContiner.current = new AMap.Autocomplete({
              city : "1853",
              input : "input_test"
            });

  
            placeSearchContiner.current = new AMap.PlaceSearch({
              city : "1853",
              map: mapRef.current
            });
            autoCompleteContiner.current.on('select', select)

            function select(e){
              console.log("e",e)
              placeSearchContiner.current.search(e.poi.name)
              placeSearchContiner.current.setCity(e.poi.adcode)
            }
          })

          mapRef.current.addListener(autoCompleteContiner.current,'select',(e) => {
            placeSearchContiner.current.search(e.poi.name)
          })
          mapRef.current.on('click',(e) => {
            console.log("e",e)
          })
        })
      })
    }
  }, [])

  // useEffect(() => {
  //   if (amapLoaded) {
  //     send();
  //   }
  // }, [amapLoaded])

  return (
    <main>
      <div id="container" className="map-container" style={{height: "600px", width: "880px"}}/>
      <div>
        <button onClick={() => send("大家")}>
          test
        </button>
        <input id="input_test"/>
      </div>
    </main>
  );
}

export default MapComponent;