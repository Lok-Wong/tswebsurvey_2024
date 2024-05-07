'use client'
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

function App() {
    const router = useRouter();
    const [totalObj, setTotalObj] = React.useState()
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
    const [items, setItems] = React.useState()
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
        setItems({ ...sessionStorage })
    }, [])

    const combineObj = (objarray) => {
        objarray.map((key,index) => {
            console.log('key', key,":",items[key])
            setTotalObj((prev) => ({
                ...prev,
                [key]: items[key]
            }))
        })
    }

    React.useEffect(() => {
        console.log('totalObj', totalObj)
    },[totalObj])



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <Button onClick={()=>
                            combineObj(Object.keys(items))
                            }>
                            click
                        </Button>
                        <h1 style={{ color: "#000000" }}>
                            完成問卷
                        </h1>
                        {
                                    <div>
                                       {totalObj&& totalObj["studentNum"]}
                                    </div>
                                
                        }
                    </div>
                    :
                    null
            }

        </main>

    )
}

export default App;