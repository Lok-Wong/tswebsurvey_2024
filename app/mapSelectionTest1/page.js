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
    console.log(routeRecord);
    return;
  }

  const handleChangeData = () => {
    Object.keys(sessionStorage).map(key => (
      routeRecord[key] = JSON.parse(sessionStorage[key])
    ))

    // console.log(JSON.parse(routeRecord));
    return;
  }

  return (
    <main className={styles.main}>
      <div className={styles.question}>
        <div>
          起點1：{MapSelections(routeRecord, "start0")}
        </div>
        <div>
          目的地1：{MapSelections(routeRecord, "destination0")}
        </div>
        <div>
          起點2{MapSelections(routeRecord, "start1")}
        </div>
        <div>
          目的地2：{MapSelections(routeRecord, "destination1")}
        </div>
      </div>
      <div>
        <Button onClick={handleTestButton}>測試</Button>
      </div>
    </main>
  );
}

export default App;