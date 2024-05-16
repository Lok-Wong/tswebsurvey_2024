'use client'
import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "./page.module.css";

function MapComponent() {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [amapLoaded, setAmapLoaded] = useState(false)
  const [data, setData] = useState([]);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const autoCompleteContiner = useRef(null)
  const [keyWord, setKeyWord] = useState("大家")
  const placeSearchContiner = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [selectedLocal, setSelectedLocal] = useState(null)
  let maps = null

  useEffect(() => {
    setIsClient(true)
    window._AMapSecurityConfig = {
      securityJsCode: "5a70a60f476d153b9b6caa45864b605f",
    };
  }, [])



  async function send(value) {
    fetch(
      `https://restapi.amap.com/v3/assistant/inputtips?parameters` +
      `&key=8ede03f2819e3b30ca3b8db8eee4ee5d` +
      `&keywords=${value}` +
      `&city=820000` +
      `&city_limit=true` +
      `&page_size=25`,
      {
        method: "get",
      }
    ).then(async (res) => {
      res = await res.json();
      setData(res.pois);
      console.log("res", res.tips);
      let listData = [];
      res.tips.forEach((item) => {
        listData.push({ id: item.id, name: item.name })
      })
      setAutoCompleteData(listData);
    })
  }

  useEffect(() => {
    console.log("autoCompleteData", autoCompleteData)
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      import('@amap/amap-jsapi-loader').then(AMapLoader => {
        AMapLoader.load({
          city: "澳門",
          key: 'b92a5dfebcf8e5ba5cce62051141de74',
          version: '2.0',
        }).then((AMap) => {
          setAmapLoaded(true)
          maps = new AMap.Map('container', {
            // 设置地图容器id
            viewMode: '2D', // 是否为3D地图模式
            zoom: 13, // 初始化地图级别
            center: [113.568683, 22.162143], // 初始化地图中心点位置
          });

          AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.Geocoder'], () => {
            
            var geocoder = new AMap.Geocoder({
              city:"1853"
            })
            maps.on('click', (e) => {
              let lnglat = [e.lnglat.lng, e.lnglat.lat]
              geocoder.getAddress(lnglat, function(status, result) {
                setSelectedLocal(result.regeocode.formattedAddress)
                console.log("result", result)
              })
            })
            
            autoCompleteContiner.current = new AMap.Autocomplete({
              city: "1853",
              input: "input_test"
            });


            placeSearchContiner.current = new AMap.PlaceSearch({
              city: "1853",
              map: maps
            });
            autoCompleteContiner.current.on('select', select)

            function select(e) {
              console.log("e", e)
              setSelectedLocal(e.poi.name)
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

  // useEffect(() => {
  //   if (amapLoaded) {
  //   }
  // }, [amapLoaded])

  return (
    <main>
    {
        isClient ?
          <div>
            <div id="container" style={{ height: "97.1vh", width: "100vw" }} />
            <div style={{position:"absolute", top:"0"}}>       
              <input id="input_test" style={{height:"5vh",width:"100vw"}} />
            </div>
            <div>
              <p>
                {selectedLocal ? selectedLocal : "no data"}
              </p>
            </div>
          </div>
          :
          null
      }
    </main>
  );
}

export default MapComponent;