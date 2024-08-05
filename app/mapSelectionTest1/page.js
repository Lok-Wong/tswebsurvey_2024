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
  const labels = ["起點1", "目的地1", "起點2", "目的地2"];

  return (
    MapSelections(routeRecord, labels)
  );
}

export default App;