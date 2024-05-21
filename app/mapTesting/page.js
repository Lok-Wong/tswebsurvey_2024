'use client'
import { useRef, useState, useEffect } from 'react';

function MapComponent({mapInputhandleChange}) {
  const [autoData, setAutoData] = useState(null);
  const [mapClickData, setMapClickData] = useState(null)
  const autoCompleteContiner = useRef(null)
  const placeSearchContiner = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [selectedLocal, setSelectedLocal] = useState(null)
  let maps = null

  const sendDataToParentOnClick = (data,vName,type) => {
    mapInputhandleChange(data,vName,type)
  }

  useEffect(() => {
    setIsClient(true)
    window._AMapSecurityConfig = {
      securityJsCode: "5a70a60f476d153b9b6caa45864b605f",
    };
  }, [])


  useEffect(() => {
    if (typeof window !== "undefined") {
      import('@amap/amap-jsapi-loader').then(AMapLoader => {
        AMapLoader.load({
          city: "澳門",
          key: 'b92a5dfebcf8e5ba5cce62051141de74',
          version: '2.0',
        }).then((AMap) => {
          maps = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '2D', // 是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [113.568683, 22.162143], // 初始化地图中心点位置
          });

          AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.Geocoder'], () => {

            var geocoder = new AMap.Geocoder({
              city: "1853",
              citylimit: true
            })
            maps.on('click', (e) => {
              let lnglat = [e.lnglat.lng, e.lnglat.lat]
              setAutoData(null)
              setMapClickData(e.lnglat)
              geocoder.getAddress(lnglat, function (status, result) {
                setSelectedLocal(result.regeocode.formattedAddress)
                sendDataToParentOnClick(result,'address',"click")
              })
            })

            autoCompleteContiner.current = new AMap.Autocomplete({
              city: "1853",
              input: "input_test",
              citylimit: true
            });


            placeSearchContiner.current = new AMap.PlaceSearch({
              city: "1853",
              map: maps,
              citylimit: true
            });
            autoCompleteContiner.current.on('select', select)

            function select(e) {
              setMapClickData(null)
              setAutoData(e)
              setSelectedLocal(e.poi.name)
              sendDataToParentOnClick(e,'address',"autoComplete")
              placeSearchContiner.current.search(e.poi.name)
              placeSearchContiner.current.setCity(e.poi.adcode)
            }
          })

          // maps.addListener(autoCompleteContiner.current,'select',(e) => {
          //   placeSearchContiner.current.search(e.poi.name)
          // })
          // AMap.plugin('AMap.Geocoder',function(){
          //   var geocoder = new AMap.Geocoder({
          //     city:"1853"
          //   })
          //   maps.on('click', (e) => {
          //     console.log("e", e)
          //     let lnglat = [e.lnglat.lng, e.lnglat.lat]
          //     geocoder.getAddress(lnglat, function(status, result) {
          //       console.log("result", result)
          //     })
          //   })
          // })
        })
      })
    }
  }, [])


  return (
    <main>
      {
        isClient ?
          <div>
              <input id="input_test" style={{
                height: "3.5vh",
                width: "80vw",
                border: "3px solid #000",
                borderRadius: "5px",
                color: "#282828",
                fontSize: "1em",
                padding: "0 6px",
                focus: { border: "3px solid #5551ff" }
              }} />
            <div id="container" style={{ height: "40vh", width: "80vw" }} />
            {/* <div style={{ position: "absolute", backgroundColor: "#ffffff", bottom: 40 }}>
              <p>
                {selectedLocal ? selectedLocal : "selectedLocal no data"}<br></br>
                {mapClickData ? JSON.stringify(mapClickData) : "mapClickData no data"}<br></br>
                {autoData ? JSON.stringify(autoData.poi.location) : "autoData no data"}<br></br>
              </p>
            </div> */}
          </div>
          :
          null
      }
    </main>
  );
}

export default MapComponent;

