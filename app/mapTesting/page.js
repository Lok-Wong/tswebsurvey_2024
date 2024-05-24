'use client'
import { Button } from 'antd';
import { useRef, useState, useEffect } from 'react';
import styles from "./page.module.css";

function MapComponent({handleCustomAddress}) {

  const autoCompleteContiner = useRef(null)
  const placeSearchContiner = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [inputValue, setInputVale] = useState(null)
  const [mapData, setMapData] = useState(null)
  const [collectMethod, setCollectMethod] = useState(null)
  let maps = null


  const sendCustomAddress = (address,type) => {
    handleCustomAddress(address,type)
  }

  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((k) => k + 1)
},[])



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

              geocoder.getAddress(lnglat, function (status, result) {
                let mapDatas = {...result, regeocode : {
                  ...result.regeocode,
                  location : lnglat
                }}
                // setSelectedLocal(result.regeocode.formattedAddress)
                setInputVale(result.regeocode.formattedAddress)
                setCollectMethod('click')
                setMapData((mapDatas))
              })
            })

            autoCompleteContiner.current = new AMap.Autocomplete({
              city: "1853",
              input: "input_test",
              citylimit: true,
            });


            placeSearchContiner.current = new AMap.PlaceSearch({
              city: "1853",
              map: maps,
              citylimit: true
            });
            autoCompleteContiner.current.on('select', select)

            function select(e) {

              setMapData(e)
              setInputVale(e.poi.name)
              setCollectMethod("autoComplete")
              placeSearchContiner.current.search(e.poi.name)
              placeSearchContiner.current.setCity(e.poi.adcode)
            }
          })
        })
      })
    }
  },[])



  return (
    <main  key={key}>
      {
        isClient ?
          <div style={{justifyItems:"center"}}>
            <div style={{marginBottom:"1vh"}}>
              <input 
                id="input_test" 
                value={inputValue}
                className={styles.tipInput}
                onChange={(e) => {setInputVale(e.target.value),setCollectMethod("input"),setMapData(e.target.value)}}
              />
              <Button 
                style={{marginLeft:"1vw"}}
                onClick={()=>sendCustomAddress(mapData,collectMethod)}
                >
                確定
              </Button>
            </div>
            <div id="container" className={styles.container} />
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

