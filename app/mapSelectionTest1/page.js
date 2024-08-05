'use client'
import * as React from 'react';
import styles from "./page.module.css";
import MapSelections from "../mapSelection/page";
import Button from "@mui/material/Button"

function App() {
  const routeRecord = {
    start0: 999,
    destination0: 999,
    start1: 999,
    destination1: 999,
  }

  const handleTestButton = () => {
    console.log(routeRecord);

    return;
  }

  const handleChangedData = (label) => {
    // routeRecord = JSON.parse(sessionStorage.getItem(routeRecord));
    return;
  }

  return (
    <main className={styles.main}>
      <div className={styles.question}>
        起點：{MapSelections(routeRecord, "start0")}
      </div>
      <div>
        <Button onClick={handleTestButton}>測試</Button>
      </div>
      {handleChangedData("start0")}
    </main>
  );
}

export default App;