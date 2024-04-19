'use client'
import * as React from 'react';
import styles from "./page.module.css";
import AMapLoader from '@amap/amap-jsapi-loader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';

const Demo = () => (
    <div>
      <Map style={{ height: 300}}>
        <ScaleControl offset={[16, 30]} position="LB" />
        <ToolBarControl offset={[16, 10]} position="RB" />
        <ControlBarControl offset={[16, 180]} position="RB" />
        <Geolocation
          maximumAge={100000}
          borderRadius="5px"
          position="RB"
          offset={[16, 80]}
          zoomToAccuracy={true}
          showCircle={true}
        />
      </Map>
      <Map style={{ height: 300 }}>
        {({ AMap, map, container }) => {
          return;
        }}
      </Map>
    </div>
  );
  
  const Mount = () => (
    <div className={styles.MapContainer}>
        <APILoader version="2.0" akey="acafdf9063b0476ecb3d2f5dc6345158">
                <Demo />
        </APILoader>
    </div>

  )
  export default Mount

// function App() { 
//     let map = null;

//     React.useEffect(() => {
//         AMapLoader.load({
//             key:"acafdf9063b0476ecb3d2f5dc6345158",                     // 申请好的Web端开发者Key，首次调用 load 时必填
//             version:"2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
//             plugins:['AMap.ToolBar','AMap.MapType','AMap.Driving','AMap.AutoComplete','AMap.PlaceSearch'],               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
//           }).then((AMap)=>{
//             this.map = new AMap.Map("container",{ //设置地图容器id
//               viewMode:"2D",         //是否为3D地图模式
//               zoom:13,                //初始化地图级别
//               center:[113.565598,22.156584], //初始化地图中心点位置
//             });
//           }).catch(e=>{
//             console.log(e);
//           });

//           return () => {
//             map?.destroy();
//           };
//       },[]);

//     return(
//         <div className={styles.MapContainer}>
//             <div>
//             <Box
//                 component="form"
//                 sx={{
//                 '& > :not(style)': { m: 1, width: '15rem' },
//                 }}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <TextField 
//                     sx={{backgroundColor:"white"}} 
//                     id="verify_textField" 
//                     label="Start" 
//                     variant="filled" />

//                 <TextField 
//                     sx={{backgroundColor:"white"}} 
//                     id="verify_textField" 
//                     label="End" 
//                     variant="filled" />
//             </Box>
//             </div>
//             <div 
//                 id="container" 
//                 className={styles.container} 
//                 style={{ height: '45rem' }} > 
//             </div>
//         </div>
//     )
// }

// export default App