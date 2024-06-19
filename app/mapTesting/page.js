'use client'
import { Button } from 'antd';
import { useRef, useState, useEffect } from 'react';
import styles from "./page.module.css";

function MapComponent({ handleCustomAddress }) {

  const autoCompleteContiner = useRef(null)
  const placeSearchContiner = useRef(null)
  const geolocation = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [inputValue, setInputVale] = useState(null)
  const [mapData, setMapData] = useState(null)
  const [collectMethod, setCollectMethod] = useState(null)
  let maps = null


  const sendCustomAddress = (address, type) => {
    handleCustomAddress(address, type)
  }

  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((k) => k + 1)
  }, [])



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
            resizeEnable: true, // 是否监控地图容器尺寸变化
          });

          AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.Geocoder', 'AMap.Geolocation'], () => {


            geolocation.current = new AMap.Geolocation({
              enableHighAccuracy: true, // 是否使用高精度定位，默认：true
              timeout: 1000, // 设置定位超时时间，默认：无穷大
              offset: [10, 20],  // 定位按钮的停靠位置的偏移量
              zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              position: 'RB',
              needAddress: true,
              showMarker:true,
              showCircle:false
            })

            var geocoder = new AMap.Geocoder({
              city: "1853",
              citylimit: true
            })

            geolocation.current.on('complete', function (result) {
              if (result.info == 'SUCCESS') {
                setInputVale(result.formattedAddress)
                setCollectMethod('geolocation')
                setMapData((result))                        
              }
            })

            // geolocation.current.getCurrentPosition(function (status, result) {
            //   if (status == 'complete') {
            //     setInputVale(result.formattedAddress)
            //     setCollectMethod('geolocation')
            //     setMapData((result))                        
            //   }
            // })

            maps.addControl(geolocation.current)


            maps.on('click', (e) => {
              let lnglat = [e.lnglat.lng, e.lnglat.lat]

              geocoder.getAddress(lnglat, function (status, result) {
                let mapDatas = {
                  ...result, regeocode: {
                    ...result.regeocode,
                    location: lnglat
                  }
                }
                // setSelectedLocal(result.regeocode.formattedAddress)
                setInputVale(result.regeocode.formattedAddress)
                setCollectMethod('click')
                setMapData((mapDatas))
              })
            })

            autoCompleteContiner.current = new AMap.Autocomplete({
              city: "1853",
              input: "input_test",
              // output : "search_hint",
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
  }, [])



  return (
    <main key={key}>
      {
        isClient ?
          <div style={{ justifyItems: "center" }}>
            <div style={{display:'flex',justifyContent:"center",alignItems:"center",marginBottom: "1vh" }}>
              <textarea
                maxLength="50"
                style={{alignSelf:'center'}}
                id="input_test"
                value={inputValue}
                className={styles.tipInput}
                onChange={(e) => { setInputVale(e.target.value), setCollectMethod("input"), setMapData(e.target.value) }}
              />
              <Button
                style={{ marginLeft: "1vw" }}
                onClick={() => sendCustomAddress(mapData, collectMethod)}
              >
                確定
              </Button>
            </div>
            <div>
              <div id="container" className={styles.container} />
            </div>
          </div>
          :
          null
      }
    </main>
  );
}

export default MapComponent;

