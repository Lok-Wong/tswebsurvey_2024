"use client"
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export default function App() {
    // const fs = require('fs');
    // const path = require('path');
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

    React.useEffect(() => { items && combineObj(Object.keys(items)) }, [items])

    const combineObj = (objarray) => {
        objarray.map((key, index) => {
            if (key == "pathList" || key == "studnetNum" || key == "totalStudentNum") {
                setTotalObj((prev) => ({
                    ...prev,
                    [key]: items[key]
                }))
            } else {
                setTotalObj((prev) => ({
                    ...prev,
                    [key]: JSON.parse(items[key])
                }))
            }
        })
    }

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const submitData = { "data": totalObj }
        // 'http://8.138.93.45:3000/api/handleform'
        console.log('env',process.env.NEXT_PUBLIC_LOCAL_LINK)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_LINK, {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                console.log("Yeai!")
            } else {
                console.log("Oops! Something is wrong.", res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        console.log('totalObj', totalObj)
    }, [totalObj])



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>

                        <h1 style={{ color: "#000000" }}>
                            完成問卷
                        </h1>
                        {
                            <div className={styles.question}>
                                 <Button onClick={() =>
                                // combineObj(Object.keys(items));
                                handleSubmit()
                            }>
                                提交
                            </Button>
                            </div>

                           
                        }
                    </div>
                    :
                    null
            }

        </main>

    )
}
