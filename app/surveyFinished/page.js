'use client'
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';


function App() {
    const router = useRouter();
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
    const _studentNum = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_studentNum = sessionStorage.getItem('studentNum');
            if (local_storage_studentNum) {
                return local_storage_studentNum
            }
        }
        return 0;
    }, [])

    const handleNextButton = () => {
        sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
    };

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        const items = { ...sessionStorage }
        console.log("sessionKey", Object.keys(items))
    }, [])

    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000" }}>
                            完成問卷
                        </h1>
                    </div>
                    :
                    null
            }

        </main>

    )
}

export default App;