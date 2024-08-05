'use client'
import * as React from 'react';
import styles from "./page.module.css";
import MapSelections from "../mapSelection/page";

function App() {
  const routeRecord = {
    start0: 999,
    destination0: 999,
    start1: 999,
    destination1: 999,
  }

  return (
    <main className={styles.main}>
      <div className={styles.question}>
        起點：{MapSelections(routeRecord, "start0")}
      </div>
    </main>
  );
}

export default App;