'use client'
import * as React from 'react';
import styles from "./page.module.css";
import MapSelections from "../mapSelection/page";
import Button from "@mui/material/Button"

function App() {
  var routeRecord = {
    start0: 999,
    destination0: 999,
    start1: 999,
    destination1: 999,
  }

  const handleTestButton = () => {
    handleChangeData();
    //console.log(routeRecord);
    return;
  }

  const handleChangeData = () => {
    Object.keys(sessionStorage).map(key => {
      if (routeRecord.hasOwnProperty(key))
        routeRecord[key] = JSON.parse(sessionStorage[key]);
    })

    console.log(routeRecord["start0"]);
    return;
  }

  let props = {
    route: routeRecord,
    label: "start0"
  }

  const handlePlace = (newPlace) => {
    props.label = newPlace;
  }

  const getPlace = (place) => {
    if(routeRecord[place] != 999)
      return (
        <div>
          {routeRecord[place]}
        </div>
      )

    return;
  }

  return (
    <main className={styles.main}>
      <div className={styles.question}>
        <div>
          起點1：{routeRecord["start0"]}<MapSelections {...props} />
        </div>
        <div>
          {handlePlace("destination0")}
          目的地1：<MapSelections {...props} />
        </div>
        <div>
         {handlePlace("start1")}
          起點2：<MapSelections {...props} />
        </div>
        <div>
          {handlePlace("destination1")}
          目的地2：<MapSelections {...props} />
        </div>
      </div>
      <div>
        <Button onClick={handleTestButton}>測試</Button>
      </div>
    </main>
  );
}

export default App;