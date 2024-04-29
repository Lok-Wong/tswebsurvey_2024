'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// acafdf9063b0476ecb3d2f5dc6345158
//window._AMapSecurityConfig = {
 // securityJsCode : "5a70a60f476d153b9b6caa45864b605f"
//};

function App() {
  const [amapLoaded, setAmapLoaded] = React.useState(false)

  // React.useEffect(() => initMap(), []);
  React.useEffect(() => search(), []);

  const options = ['Option 1', 'Option 2'];
  const [Mvalues, setValues] = React.useState(null);

  // const initMap = () => {
  //   AMapLoader.load({
  //     key : "b92a5dfebcf8e5ba5cce62051141de74",
  //     version : "2.0",
  //     plugins : ['AMap.Riding','AMap.DrivingPolicy.LEAST_FEE', 'AMap.LngLat', 'AMap.Map', 'AMap.Polyline', 'AMap.PolylineEditor'],
  //   }).then((AMap,log) => {
  //     let map = new AMap.Map("container", {
  //       center: [116.397428, 39.90923],
  //       zoom:14
  //     });
  //     var ridingOption = {
  //       map: map,
  //       panel: "panel",
  //       policy: 2,
  //       hideMarkers: false, 
  //       isOutline: true,
  //       outlineColor: 'blue',
  //       autoFitView: true,
  //     }
  //     var riding = new AMap.Riding(ridingOption);
  //     const zupOne = new AMap.LngLat(116.397428, 39.90923);
  //     const zupTwo = new AMap.LngLat(116.297228, 39.90933);
  //      riding.search(zupOne,zupTwo,function(status,result){
  //       console.log("result",result)
  //      });
  //   }).catch(e => {
  //     console.log("e",e);
  //   });
  // }

  const search = () => {
    if (typeof window !== 'undefined'){
      import('@amap/amap-jsapi-loader').then(AMapLoader => {
        AMapLoader.load({
          key : "b92a5dfebcf8e5ba5cce62051141de74",
          version : "2.0",
          plugins : ['AMap.AutoComplete']
          .then((AMap,log) => {
            let map = new AMap.Map("container", {
              center: [116.397428, 39.90923],
              zoom:14
            });
          })
          , function () {
            var autoOptions = {
              city : "澳门",
              input : "tipinput"
            };
            var autoComplete = new AMap.AutoComplete(autoOptions);
            autoComplete.search(Mvalues, function(status, result) {
              console.log("result2",result);
            });
          }
        })
      })
    }
  }

  
  return (
    <>
      <div id="container" style={{ width: '100%', height: '400px' }}>
      </div>
      {/* <div id="panel"></div> */}
      <div>
        <input 
          id='tipinput' 
          type="text"
           name='text' 
           style={{ width: 100, height: 30 }} 
           onChange={e => setValues(e.target.value)}
        />
      </div>
    </>
  );
}

export default App;