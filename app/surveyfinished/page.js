'use client'
import * as React from 'react';
import styles from "./page.module.css";

function App() {
    return(
        <main className={styles.main}>
            <div>
                <h1>
                    弓起完成,可以關閉了
                </h1>
            </div>
            <div className={styles.testing}>
                <div className={styles.testing1}>
                    <a>a</a>
                    <p>1</p>
                </div>
                <div>
                    <a>c</a>
                </div>           
                <div>
                    <p>b</p>
                </div>
                <div>
                    <p>d</p>
                </div>
            </div>
        </main>
    )
}
export default App